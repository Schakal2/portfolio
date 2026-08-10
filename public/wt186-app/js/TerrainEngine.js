class TerrainEngine {
    constructor() {
        // --- STEP 1: INITIALIZE ALL DATA OBJECTS ---
        this.terrain = new TerrainManager();
        this.audio = new AudioManager(this);
        this.visuals = new VisualManager('terrain-canvas-3d', 'terrain-canvas-2d');
        this.visuals.engine = this;
        
        this.assetInbox = []; 
        this.modMatrix = []; 
        this.state = { xmod: 0.5, morph: 0 };
        this.orbit = { speed: 50, radius: 0.2 }; 

        // --- STEP 2: DEFINE MODPARAMS BEFORE THE UI LOADS ---
        // This is the line your error was looking for!
        this.modParams = { 
            mod1: { type: 'lfo', rate: 1, shape: 'Sine' } 
        };

        // --- STEP 3: INITIALIZE UI MANAGERS LAST ---
        // Now when InputManager starts and calls engine.updateModulator, 
        // this.modParams is already waiting for it.
        this.inputs = new InputManager(this);
        this.presets = new PresetManager();
    }
    async boot() {
        await this.audio.init();
        if (this.terrain.stack.length > 0) {
            this.audio.syncStack(this.terrain.stack);
            const params = ['morph', 'xmod', 'speed', 'radius', 'centerX', 'centerY', 'squeezeX', 'squeezeY', 'gate'];
            params.forEach(id => {
                const el = document.getElementById(id);
                if (el) this.audio.updateParam(id, parseFloat(el.value));
            });
            this.updateVisualLayers(this.getModulatedParam('morph'));
        }
        this.visuals.render(); 
    }

    updateVisualLayers(morphValue) {
        const floorIdx = Math.floor(morphValue);
        const ceilIdx = Math.min(floorIdx + 1, this.terrain.stack.length - 1);
        const layerA = this.terrain.stack[floorIdx];
        const layerB = this.terrain.stack[ceilIdx] || layerA;
        if (layerA) this.visuals.updateTerrain(layerA, layerB);
    }

    handleParamChange(id, value) {
        this.state[id] = value;
        this.audio.updateParam(id, value);
        if (id === 'morph') this.updateVisualLayers(value);
    }

    async handleFileUpload(files) {
        for (const file of Array.from(files)) {
            if (file.type.startsWith('image/')) {
                const idx = await this.terrain.decodeImage(file);
                this.finalizeNewLayer(idx);
                continue;
            }

            const rawData = await this.terrain.getRawAudioData(file, this.audio.ctx);

            if (this.assetInbox.length === 0) {
                this.assetInbox.push({ file, data: rawData });
                const idx = this.terrain.generateMatrices(rawData, null, 'audio');
                this.finalizeNewLayer(idx);
            } else {
                const dataA = this.assetInbox[0].data;
                const targetIdx = this.terrain.stack.length - 1;
                this.terrain.updateMatrices(targetIdx, dataA, rawData);
                this.assetInbox = [];
                this.finalizeNewLayer(targetIdx);
            }
        }
    }

    finalizeNewLayer(index) {
        const slider = document.getElementById('morph');
        if (slider) {
            slider.max = this.terrain.stack.length - 1;
            slider.value = index;
        }
        this.audio.syncStack(this.terrain.stack);
        this.updateVisualLayers(index);
        console.log(`✅ Layer ${index} Synced.`);
    }

    clearStack() {
        this.terrain.stack = [];
        this.assetInbox = [];
        const slider = document.getElementById('morph');
        if (slider) { slider.max = 0; slider.value = 0; }
        this.audio.syncStack([]);
    }

    getModulatedParam(id) {
        let val = parseFloat(document.getElementById(id)?.value || 0);
        this.modMatrix.filter(m => m.dest === id).forEach(mod => {
            val += this.audio.getModSourceValue(mod.source) * mod.amount;
        });
        return Math.max(0, val); 
    }

    addModulation(source, dest) {
        if (!this.modMatrix.find(m => m.source === source && m.dest === dest)) {
            this.modMatrix.push({ source, dest, amount: 0.5 });
            this.audio.updateModMatrix(this.modMatrix);
        }
    }

    updateModAmount(source, dest, amt) {
        const mapping = this.modMatrix.find(m => m.source === source && m.dest === dest);
        if (mapping) {
            mapping.amount = amt;
            this.audio.updateModMatrix(this.modMatrix);
        }
    }

    // --- PASTE THIS NEW METHOD ---
    updateModulator(id, key, value) {
        // If the object for mod1, mod2, etc doesn't exist yet, create it on the fly
        if (!this.modParams) this.modParams = {}; // Final safety shield
        if (!this.modParams[id]) {
            this.modParams[id] = { type: 'lfo', rate: 1, shape: 'Sine' };
        }
        
        this.modParams[id][key] = value;
        this.audio.updateModParams(this.modParams);
    }
}