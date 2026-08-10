class InputManager {
    constructor(engine) {
        this.engine = engine;
        // Boot up only the core listeners
        this.setupEventListeners();
        this.setupDropZone(); 
        this.setupModulationDragAndDrop(); 
        this.setupOrbitShortcuts(); 
    }

    setupEventListeners() {
        // Use .onclick to ensure only ONE listener ever exists
        const toggleBtn = document.getElementById('toggle-mode');
        if (toggleBtn) {
            toggleBtn.onclick = (e) => {
                const newMode = this.engine.orbit.mode === 0 ? 1 : 0;
                this.engine.handleParamChange('useVector', newMode);
                e.target.innerText = newMode === 0 ? "MODE: ORBIT" : "MODE: VECTOR";
            };
        }

        document.querySelectorAll('input[type=range]').forEach(knob => {
            knob.oninput = (e) => {
                let val = parseFloat(e.target.value);
                const display = e.target.parentElement.querySelector('.val-display');
                if (display) {
                    display.innerText = e.target.id === 'cutoff' ? `${Math.round(val)}Hz` : val.toFixed(2);
                }
                this.engine.handleParamChange(e.target.id, parseFloat(e.target.value));
            };
        });

        const droneToggle = document.getElementById('drone-mode');
        if (droneToggle) {
            droneToggle.onchange = (e) => this.engine.audio.triggerEnvelope(e.target.checked);
        }

        const presetList = document.getElementById('preset-list');
        if (presetList) {
            presetList.onchange = (e) => this.engine.presets.loadPreset(e.target.value);
        }

        const saveBtn = document.getElementById('save-to-browser');
        if (saveBtn) {
            saveBtn.onclick = async () => {
                const nameInput = document.getElementById('preset-name');
                const name = nameInput.value || "New Patch " + new Date().toLocaleTimeString();
                
                const currentParams = {};
                document.querySelectorAll('input[type="range"]').forEach(s => {
                    currentParams[s.id] = parseFloat(s.value);
                });
                
                // Add the Drone Mode state to the preset
                currentParams['drone-mode'] = document.getElementById('drone-mode').checked ? 1 : 0;

                console.log("💾 Saving Preset:", name);
                await this.engine.presets.savePreset(name, currentParams, this.engine.terrain.stack);
                
                alert("Preset Saved Successfully!");
                nameInput.value = ""; // Clear for next time
            };
        }

        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess().then(m => this.initMIDI(m));
        }

        // Set up the default MOD 1 on load
        this.renderModulatorUI('mod1', 'lfo');

        // The "+ ADD" Button Logic
        const addBtn = document.getElementById('add-mod-btn');
        if (addBtn) {
            addBtn.onclick = () => {
                const container = document.getElementById('mod-list-container');
                const count = container.children.length + 1;
                const newModId = `mod${count}`;
                const colorClass = count % 2 === 0 ? 'mod-color-2' : 'mod-color-1';

                const modBlock = document.createElement('div');
                modBlock.className = 'mod-block';
                modBlock.id = `${newModId}-container`;
                
                modBlock.innerHTML = `
                    <div class="mod-header">
                        <span style="font-size: 10px; color: #aaa; font-weight: bold; margin-right: 10px;">MOD ${count}</span>
                        <select class="mod-type" id="${newModId}-type" style="background: #000; color: #fff; border: 1px solid #444; flex: 1; margin-right: 10px;">
                            <option value="lfo">LFO</option>
                            <option value="env">ENV</option>
                            <option value="oneshot">ONE-SHOT</option>
                        </select>
                        <div class="mod-handle ${colorClass}" draggable="true" data-source="${newModId}">+</div>
                    </div>
                    <div class="knob-group mod-controls" id="${newModId}-controls"></div>
                `;

                container.appendChild(modBlock);
                this.renderModulatorUI(newModId, 'lfo'); // Default to LFO
                this.setupModulationDragAndDrop(); // Re-bind draggable handles
            };
        }
    }

    // --- THE DYNAMIC UI BUILDER ---
    renderModulatorUI(modId, type) {
        const controlsDiv = document.getElementById(`${modId}-controls`);
        if (!controlsDiv) return;

        // Ensure engine has a slot for this specific modId
        if (this.engine) {
            this.engine.updateModulator(modId, 'type', type);
        }

        // 2. Build the HTML based on the type
        let html = '';
        if (type === 'lfo') {
            html = `
                <label>Rate <span class="val-display">1.00</span><input type="range" id="${modId}-rate" min="0.1" max="20" step="0.1" value="1"></label>
                <label>Shape:
                    <select id="${modId}-shape" style="background: #000; color: #fff; border: 1px solid #333;">
                        <option value="Sine">Sine</option>
                        <option value="Square">Square</option>
                        <option value="Saw">Saw</option>
                    </select>
                </label>
            `;
        } else if (type === 'env') {
            html = `
                <label>A <span class="val-display">0.01</span><input type="range" id="${modId}-atk" min="0.001" max="1" step="0.01" value="0.01"></label>
                <label>D <span class="val-display">0.20</span><input type="range" id="${modId}-dec" min="0.001" max="1" step="0.01" value="0.2"></label>
                <label>S <span class="val-display">0.70</span><input type="range" id="${modId}-sus" min="0" max="1" step="0.01" value="0.7"></label>
                <label>R <span class="val-display">0.50</span><input type="range" id="${modId}-rel" min="0.001" max="2" step="0.01" value="0.5"></label>
            `;
        } else if (type === 'oneshot') {
            html = `
                <label>A <span class="val-display">0.01</span><input type="range" id="${modId}-atk" min="0.001" max="1" step="0.01" value="0.01"></label>
                <label>R <span class="val-display">0.50</span><input type="range" id="${modId}-rel" min="0.001" max="2" step="0.01" value="0.5"></label>
            `;
        }
        
        controlsDiv.innerHTML = html;

        // 3. Bind the listeners for these newly created sliders!
        controlsDiv.querySelectorAll('input[type=range]').forEach(knob => {
            knob.oninput = (e) => {
                const val = parseFloat(e.target.value);
                e.target.parentElement.querySelector('.val-display').innerText = val.toFixed(2);
                
                // e.g. "mod1-atk" -> updates "atk"
                const paramKey = e.target.id.split('-')[1]; 
                this.engine.updateModulator(modId, paramKey, val);
            };
        });

        controlsDiv.querySelectorAll('select').forEach(sel => {
            sel.onchange = (e) => {
                const paramKey = e.target.id.split('-')[1];
                this.engine.updateModulator(modId, paramKey, e.target.value);
            };
        });

        // 4. Bind the main type dropdown
        const typeSelect = document.getElementById(`${modId}-type`);
        if (typeSelect) {
            typeSelect.onchange = (e) => this.renderModulatorUI(modId, e.target.value);
            typeSelect.value = type;
        }
    }

    initMIDI(midi) {
        midi.inputs.forEach(input => input.onmidimessage = (msg) => this.handleMIDIMessage(msg));
    }

    handleMIDIMessage(msg) {
        // mask the first 4 bits to get the command type regardless of MIDI channel
        const command = msg.data[0] & 0xf0; 
        const note = msg.data[1];
        const velocity = msg.data.length > 2 ? msg.data[2] : 0;
        
        const isDrone = document.getElementById('drone-mode')?.checked;

        // 0x90 is Note On
        if (command === 0x90 && velocity > 0) {
            console.log(`🎹 MIDI Note On: ${note}`);
            this.engine.audio.playNote(note);
        } 
        // 0x80 is Note Off, or Note On with 0 velocity
        else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
            if (!isDrone) {
                this.engine.audio.stopNote();
            }
        }
    }

    setupDropZone() {
        const wrapper = document.getElementById('drop-wrapper');
        const dropZone = document.getElementById('drop-zone');
        if (!wrapper || !dropZone) return;

        // 1. Global prevent defaults
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(name => {
            window.addEventListener(name, (e) => { e.preventDefault(); e.stopPropagation(); });
        });

        // 2. Show the overlay when entering the area
        wrapper.addEventListener('dragover', () => {
            wrapper.classList.add('dragover');
        });

        // 3. Hide the overlay when leaving
        dropZone.addEventListener('dragleave', (e) => {
            wrapper.classList.remove('dragover');
        });

        // 4. Handle the actual drop
        dropZone.addEventListener('drop', async (e) => {
            wrapper.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            
            console.log(`📥 Processing ${files.length} files via global dropzone`);
            await this.engine.handleFileUpload(files);
        });
    }

    setupOrbitShortcuts() {
        document.getElementById('reset-circle')?.addEventListener('click', () => {
            this.updateMultipleParams({ centerX: 0.5, centerY: 0.5, squeezeX: 1.0, squeezeY: 1.0, radius: 0.2 });
        });
        document.getElementById('drive-x')?.addEventListener('click', () => {
            this.updateMultipleParams({ centerY: 0.5, squeezeY: 0.0, squeezeX: 1.0, radius: 0.4 });
        });
        document.getElementById('drive-y')?.addEventListener('click', () => {
            this.updateMultipleParams({ centerX: 0.5, squeezeX: 0.0, squeezeY: 1.0, radius: 0.4 });
        });
    }

    updateMultipleParams(params) {
        for (const [id, val] of Object.entries(params)) {
            const slider = document.getElementById(id);
            if (slider) {
                slider.value = val;
                this.engine.handleParamChange(id, val);
            }
        }
    }

    setupModulationDragAndDrop() {
        const handles = document.querySelectorAll('.mod-handle');
        const targets = document.querySelectorAll('.drop-target');
        handles.forEach(h => h.addEventListener('dragstart', (e) => e.dataTransfer.setData('source', h.dataset.source)));
        targets.forEach(t => {
            t.addEventListener('dragover', (e) => { e.preventDefault(); t.classList.add('drag-over'); });
            t.addEventListener('dragleave', () => t.classList.remove('drag-over'));
            t.addEventListener('drop', (e) => {
                e.preventDefault();
                t.classList.remove('drag-over');
                const source = e.dataTransfer.getData('source');
                const slider = t.querySelector('input[type="range"]');
                if (slider && source) {
                    this.engine.addModulation(source, slider.id);
                    this.createModAmountUI(source, slider.id);
                }
            });
        });
    }

    createModAmountUI(source, destination) {
        const container = document.getElementById(`${source}-controls`) || document.querySelector('.mod-block');
        if (!container) return;
        const existingId = `mod-row-${source}-${destination}`;
        if (document.getElementById(existingId)) return;
        const row = document.createElement('div');
        row.id = existingId;
        row.className = 'knob-group';
        row.style.borderLeft = "2px solid #0ff"; row.style.paddingLeft = "10px"; row.style.marginTop = "10px";
        row.innerHTML = `<label>-> ${destination.toUpperCase()} AMT <span class="val-display">0.50</span><input type="range" min="-1" max="1" step="0.01" value="0.5"></label>`;
        container.appendChild(row);
        row.querySelector('input').addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            row.querySelector('.val-display').innerText = val.toFixed(2);
            this.engine.updateModAmount(source, destination, val);
        });
    }

    updateModulator(id, key, value) {
        // Double check safety: if mod1 doesn't exist, create it
        if (!this.modParams[id]) {
            this.modParams[id] = { type: 'lfo', rate: 1, shape: 'Sine' };
        }
        
        this.modParams[id][key] = value;
        this.audio.updateModParams(this.modParams);
    }
}