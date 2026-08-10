/**
 * PresetManager.js - Mark II
 * Encapsulates IndexedDB storage, Zip Export/Import, and UI synchronization.
 */
class PresetManager {
    constructor(dbName = "TerrainSynthDB", storeName = "presets") {
        this.dbName = dbName;
        this.storeName = storeName;
        this.db = null;
        this.onLoadCallbacks = [];
    }

    // Initialize the Database
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: "name" });
                }
            };

            request.onsuccess = async (e) => {
                this.db = e.target.result;
                console.log("🗄️ PresetManager: Database Ready");
                
                // Populate the dropdown first
                await this.refreshDropdown();
                
                // Find all keys to see if we can load the "First" one
                const tx = this.db.transaction(this.storeName, "readonly");
                const store = tx.objectStore(this.storeName);
                store.getAllKeys().onsuccess = (event) => {
                    const keys = event.target.result.sort();
                    resolve(keys); // Send the list of keys back to main.js
                };
            };

            request.onerror = (e) => reject(e);
        });
    }

    // Register a callback to update your main app when a preset loads
    onLoad(callback) {
        // We just store the function here to be called later
        this.onLoadCallbacks.push(callback);
    }

    // DELETE: Remove a preset by name
    async deletePreset(name) {
        if (!this.db) return;
        const tx = this.db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        
        return new Promise((resolve) => {
            store.delete(name).onsuccess = () => {
                console.log(`🗑️ Deleted: ${name}`);
                this.refreshDropdown(); // Update the UI list automatically
                resolve();
            };
        });
    }

    // Improved save method that handles the terrainStack conversion internally
    async savePreset(name, params, stack) {
        if (!this.db) {
            console.error("❌ DB not initialized. Cannot save.");
            return;
        }

        // We convert the stack to a plain array of ArrayBuffers for IndexedDB
        const serializableStack = stack.map(layer => ({
            plus: layer.plus.buffer, 
            times: layer.times ? layer.times.buffer : null
        }));

        const patchData = {
            name,
            params,
            terrainStack: serializableStack,
            timestamp: Date.now()
        };

        const tx = this.db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        
        return new Promise((resolve, reject) => {
            const request = store.put(patchData);
            request.onsuccess = () => {
                console.log(`✅ Saved preset: ${name}`);
                this.refreshDropdown();
                resolve();
            };
            request.onerror = (e) => reject(e);
        });
    }

    // LOAD: Get data from DB
    async loadPreset(name) {
        if (!this.db) return;

        const tx = this.db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);

        return new Promise((resolve) => {
            store.get(name).onsuccess = (e) => {
                const data = e.target.result;
                if (data) {
                    // Trigger all listeners (Visualizer, AudioWorklet, UI)
                    this.onLoadCallbacks.forEach(cb => cb(data));
                }
                resolve(data);
            };
        });
    }

    // UI: Refresh the <select> element
    async refreshDropdown() {
        const list = document.getElementById('preset-list');
        if (!list || !this.db) return;

        const tx = this.db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);

        store.getAllKeys().onsuccess = (e) => {
            const keys = e.target.result.sort();
            list.innerHTML = '';
            keys.forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.innerText = key.includes('/') ? `📁 ${key}` : `📄 ${key}`;
                list.appendChild(option);
            });
        };
    }

    // EXPORT: Create a Master .zip
    async exportLibrary() {
        if (!typeof JSZip === 'undefined') return alert("JSZip library missing!");
        
        const zip = new JSZip();
        const tx = this.db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);

        store.getAll().onsuccess = async (e) => {
            const all = e.target.result;
            if (all.length === 0) return alert("Library is empty!");

            all.forEach(patch => {
                const folder = zip.folder(patch.name.split('/')[0] || "Unsorted");
                const cleanName = patch.name.split('/').pop().replace(/\s+/g, '_');
                
                // Save JSON for params
                folder.file(`${cleanName}.json`, JSON.stringify({
                    name: patch.name,
                    params: patch.params
                }, null, 2));

                // Save binary data for the whole stack
                patch.terrainStack.forEach((layer, i) => {
                    folder.file(`${cleanName}_layer${i}.bin`, layer.plus.buffer);
                });
            });

            const content = await zip.generateAsync({ type: "blob" });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = "MARK_II_LIBRARY.zip";
            a.click();
        };
    }

    async importLibrary(file) {
        if (typeof JSZip === 'undefined') return alert("JSZip missing!");
        const zip = await JSZip.loadAsync(file);
        const files = Object.keys(zip.files);
        
        // We look for .json files (the metadata)
        const patchFiles = files.filter(f => f.endsWith('.json'));

        for (const path of patchFiles) {
            const jsonStr = await zip.file(path).async("string");
            const meta = JSON.parse(jsonStr);
            const patchName = meta.name;
            
            // Find associated binary layers
            const prefix = path.replace('.json', '');
            const layerFiles = files.filter(f => f.startsWith(prefix + '_layer') && f.endsWith('.bin'));
            
            const terrainStack = [];
            for (let i = 0; i < layerFiles.length; i++) {
                const binData = await zip.file(`${prefix}_layer${i}.bin`).async("arraybuffer");
                terrainStack.push({
                    plus: Array.from(new Float32Array(binData)),
                    times: null // Or reconstruction logic if needed
                });
            }

            // Save to IndexedDB
            await this.savePreset(patchName, meta.params, terrainStack);
        }
        console.log("📚 Library Import Complete");
        this.refreshDropdown();
}
    
}