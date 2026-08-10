/**
 * AudioManager.js
 * Handles the Web Audio API context, AudioWorklet lifecycle, and real-time parameters.
 */
class AudioManager {
    // Change constructor
    constructor(engine) {
        this.engine = engine; // Save reference to the brain
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.node = null;
        this.outputDevice = 'default';
    }

    /**
     * Initializes the AudioWorklet. This MUST be called after a user gesture (like a click).
     */
    async init() {
        try {
            // Ensure the correct filename for your worklet processor
            await this.ctx.audioWorklet.addModule('terrain-processor.js'); 
            
            this.node = new AudioWorkletNode(this.ctx, 'terrain-synth-processor');
            
            // Connect directly to destination
            this.node.connect(this.ctx.destination);

            this.node.port.onmessage = (e) => {
                if (e.data.x !== undefined) {
                    // This connects the Worklet's position to the Engine's orbit
                    this.engine.orbit.currentX = e.data.x;
                    this.engine.orbit.currentY = e.data.y;

                    // NEW: Update the engine's state with the real-time amplitude
                    // You can use this in VisualManager to make the 3D lines "vibrate"
                    this.engine.state.currentAmplitude = e.data.amplitude;
                    this.engine.state.currentMorph = e.data.morph;
                }
            };

            if (this.ctx.state === 'suspended') {
                await this.ctx.resume();
            }

            await this.enumerateDevices();

            console.log("🔊 Audio Engine Online");
            return this.node;
        } catch (err) {
            console.error("❌ AudioManager failed to initialize:", err);
        }
    }

    /**
     * Sends the entire terrain stack to the AudioWorklet memory.
     */
    syncStack(stack) {
        // If audio isn't started yet, this.node is null. Just exit silently.
        if (!this.node || !stack || stack.length === 0) return;

        const layerSize = 512 * 512;
        const megaBuffer = new Float32Array(layerSize * stack.length * 2);
        const timesOffset = layerSize * stack.length;
        
        stack.forEach((layer, i) => {
            megaBuffer.set(layer.plus, i * layerSize);
            megaBuffer.set(layer.times, timesOffset + (i * layerSize));
        });

        this.node.port.postMessage({
            type: 'FULL_STACK_UPDATE',
            terrain: megaBuffer,
            count: stack.length
        });
    }

    updateParam(id, value) {
        if (!this.node) return;
        const param = this.node.parameters.get(id);
        if (param) {
            param.setTargetAtTime(value, this.ctx.currentTime, 0.01);
        }
    }

    playNote(note) {
        if (!this.node) return;
        const freq = 440 * Math.pow(2, (note - 69-36) / 12);
        const pitchParam = this.node.parameters.get('pitchOffset');
        if (pitchParam) {
            pitchParam.setTargetAtTime(freq, this.ctx.currentTime, 0.01);
        }
        this.triggerEnvelope(true);
    }

    stopNote() {
        this.triggerEnvelope(false);
    }

    triggerEnvelope(isOn) {
        if (!this.node) return;
        const gateParam = this.node.parameters.get('gate');
        if (gateParam) {
            gateParam.setTargetAtTime(isOn ? 1.0 : 0.0, this.ctx.currentTime, 0.005);
        }
    }

    updateModMatrix(assignments) {
        if (!this.node) return;
        this.node.port.postMessage({
            type: 'UPDATE_MOD_MATRIX',
            matrix: assignments 
        });
    }

    // --- PASTE THIS NEW FUNCTION HERE ---
    updateModParams(params) {
        if (!this.node) return;
        this.node.port.postMessage({
            type: 'UPDATE_MOD_PARAMS',
            params: params
        });
    }

    async enumerateDevices() {
        try {
            // This triggers the browser's "Microphone Permission" prompt.
            // Even though we want OUTPUT, browsers hide device names until 
            // the user grants input permission for security reasons.
            await navigator.mediaDevices.getUserMedia({ audio: true });
            
            const devices = await navigator.mediaDevices.enumerateDevices();
            const audioOutputs = devices.filter(device => device.kind === 'audiooutput');
            
            const selector = document.getElementById('audio-output-select');
            selector.innerHTML = ''; // Clear existing

            audioOutputs.forEach(device => {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.text = device.label || `Output ${selector.length + 1}`;
                selector.appendChild(option);
            });
        } catch (err) {
            console.error("Could not access audio devices:", err);
        }
    }

    async setOutputDevice(deviceId) {
        this.outputDevice = deviceId;
        if (this.ctx && typeof this.ctx.setSinkId === 'function') {
            try {
                await this.ctx.setSinkId(deviceId);
                console.log(`🔊 Output routed to: ${deviceId}`);
            } catch (err) {
                console.error("Failed to set audio output device:", err);
            }
        } else {
            console.warn("Browser does not support setSinkId (output routing).");
        }
    }

    getModSourceValue(source) {
    if (source === 'mod1') {
        // Simple Main-Thread Mirror for LFO 1
        const rate = parseFloat(document.getElementById('mod1-rate')?.value || 1);
        const shape = document.getElementById('mod1-shape')?.value || 'Sine';
        const time = this.ctx.currentTime;

        if (shape === 'Sine') return Math.sin(time * rate * Math.PI * 2);
        if (shape === 'Square') return Math.sin(time * rate * Math.PI * 2) > 0 ? 1 : -1;
        if (shape === 'Saw') return (time * rate % 1) * 2 - 1;
    }
    return 0;
}

/**
     * Applies organic, non-linear interference to a terrain.
     * @param {Object} layer - The {plus, times} terrain object
     * @param {number} intensity - Slider value between 0.0 and 1.0
     * @returns {Object} A new, warped {plus, times} layer
     */
    applyOrganicWarp(layer, intensity) {
        if (!layer || intensity === 0) return layer;

        const warpedPlus = new Float32Array(512 * 512);
        const warpedTimes = new Float32Array(512 * 512);

        for (let i = 0; i < 512 * 512; i++) {
            const basePlus = layer.plus[i];
            
            // layer.times is already vX * vY, making it the perfect modulator source!
            const baseTimes = layer.times[i]; 

            // The "Chaos" equation scaled by your slider
            const ripple = Math.sin(baseTimes * Math.PI * 10) * (0.5 * intensity);

            // Warp the physical heights
            warpedPlus[i] = basePlus + ripple;
            
            // Warp the X-Mod data slightly to match the new physical shape
            warpedTimes[i] = baseTimes + (ripple * 0.5); 
        }

        return { plus: warpedPlus, times: warpedTimes };
    }
}