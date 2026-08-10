class TerrainSynthProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.numLayers = 1;
        this.theta = 0;
        this.lastSample = 0;
        this.counter = 0;
        
        // --- DC Filter & SVF States ---
        this.hpf_out = 0;
        this.hpf_in_prev = 0;
        this.f_low = 0;
        this.f_band = 0;
        this.currentEnv = 0;

        this.vectorPath = new Float32Array(2048); 
        this.terrainBuffer = new Float32Array(512 * 512); 
        
        this.modMatrix = [];    
        this.modValues = { mod1: 0 };    
        this.modStates = { mod1: 0 };   
        this.modParams = { mod1: { rate: 1 } };

        this.port.onmessage = (e) => {
            if (e.data.type === 'FULL_STACK_UPDATE') {
                this.terrainBuffer = e.data.terrain;
                this.numLayers = e.data.count;
                return;
            }
            if (e.data.vectorPath) this.vectorPath = e.data.vectorPath;
            if (e.data.type === 'UPDATE_MOD_MATRIX') this.modMatrix = e.data.matrix;
            if (e.data.type === 'UPDATE_MOD_PARAMS') this.modParams = e.data.params;
        };
    }

    static get parameterDescriptors() {
        return [
            { name: 'speed', defaultValue: 100 },
            { name: 'radius', defaultValue: 0.2 },
            { name: 'morph', defaultValue: 0, minValue: 0, maxValue: 128 }, // Added this
            { name: 'xmod', defaultValue: 0.5, minValue: 0, maxValue: 1 },   // Added this
            { name: 'centerX', defaultValue: 0.5 },
            { name: 'centerY', defaultValue: 0.5 },
            { name: 'squeezeX', defaultValue: 1.0 },
            { name: 'squeezeY', defaultValue: 1.0 },
            { name: 'noise', defaultValue: 0.0 },
            { name: 'phaseDist', defaultValue: 0.0 },
            { name: 'useVector', defaultValue: 0 },
            { name: 'gate', defaultValue: 0 },
            { name: 'attack', defaultValue: 0.001, minValue: 0.001 },
            { name: 'decay', defaultValue: 0.2, minValue: 0.001 },
            { name: 'sustain', defaultValue: 0.7, minValue: 0, maxValue: 1 },
            { name: 'release', defaultValue: 0.5, minValue: 0.001 },
            { name: 'pitchOffset', defaultValue: 0 },
            { name: 'cutoff', defaultValue: 2000, minValue: 20, maxValue: 20000 },
            { name: 'res', defaultValue: 0.7, minValue: 0.01, maxValue: 1.0 }
        ];
    }

    process(inputs, outputs, parameters) {
        const output = outputs[0][0];


        // Global Parameters
        const gate = parameters.gate[0];
        const atk = Math.max(0.001, parameters.attack[0]);
        const dec = Math.max(0.001, parameters.decay[0]); 
        const sus = parameters.sustain[0];
        const rel = Math.max(0.001, parameters.release[0]);
        const f_cutoff = parameters.cutoff[0];
        const f_res = parameters.res[0];
        const noiseAmt = parameters.noise[0];
        const xmodAmt = parameters.xmod[0];

        for (let i = 0; i < output.length; i++) {
            // --- A. MODULATORS ---
            // Detect when a note is pressed or released to trigger the Envelopes
            const gate = parameters.gate[0];
            const gateTriggered = (gate > 0.5 && this.lastGate <= 0.5);
            const gateReleased = (gate <= 0.5 && this.lastGate > 0.5);
            this.lastGate = gate;

            for (let modId in this.modParams) {
                // Initialize state if it doesn't exist
                if (!this.modStates[modId]) {
                    this.modStates[modId] = { phase: 0, envVal: 0, envStage: 0 };
                }
                
                const config = this.modParams[modId];
                const state = this.modStates[modId];
                let val = 0;

                // TYPE 1: LFO (Constant Cycling)
                if (config.type === 'lfo' || !config.type) {
                    state.phase += ((config.rate || 1) / sampleRate);
                    state.phase %= 1.0;
                    
                    if (config.shape === 'Square') val = state.phase < 0.5 ? 1 : -1;
                    else if (config.shape === 'Saw') val = (state.phase * 2) - 1;
                    else val = Math.sin(state.phase * Math.PI * 2);
                }
                
                // TYPE 2: ADSR ENVELOPE
                else if (config.type === 'env') {
                    if (gateTriggered) { state.envVal = 0; state.envStage = 1; }
                    if (gateReleased) { state.envStage = 4; }

                    const atk = Math.max(0.001, config.atk || 0.01);
                    const dec = Math.max(0.001, config.dec || 0.2);
                    const sus = config.sus !== undefined ? config.sus : 0.7;
                    const rel = Math.max(0.001, config.rel || 0.5);

                    if (state.envStage === 1) { // Attack
                        state.envVal += (1.0 / (atk * sampleRate));
                        if (state.envVal >= 1.0) { state.envVal = 1.0; state.envStage = 2; }
                    } else if (state.envStage === 2) { // Decay
                        state.envVal -= (1.0 / (dec * sampleRate));
                        if (state.envVal <= sus) { state.envVal = sus; state.envStage = 3; }
                    } else if (state.envStage === 4) { // Release
                        state.envVal -= (1.0 / (rel * sampleRate));
                        if (state.envVal <= 0) { state.envVal = 0; state.envStage = 0; }
                    }
                    val = state.envVal;
                }
                
                // TYPE 3: ONE-SHOT (Attack -> Release, ignores sustain and gate release)
                else if (config.type === 'oneshot') {
                    if (gateTriggered) { state.envVal = 0; state.envStage = 1; }

                    const atk = Math.max(0.001, config.atk || 0.01);
                    const rel = Math.max(0.001, config.rel || 0.5);

                    if (state.envStage === 1) { // Attack
                        state.envVal += (1.0 / (atk * sampleRate));
                        if (state.envVal >= 1.0) { state.envVal = 1.0; state.envStage = 4; } // Go straight to release
                    } else if (state.envStage === 4) { // Release
                        state.envVal -= (1.0 / (rel * sampleRate));
                        if (state.envVal <= 0) { state.envVal = 0; state.envStage = 0; }
                    }
                    val = state.envVal;
                }

                // Save final value for the matrix router to use
                this.modValues[modId] = val;
            }

            // --- B. PARAMETER SUMMING ---
            const currentMaxL = Math.max(0, this.numLayers - 1);

            let currentRadius = parameters.radius[0];
            let currentSpeed = parameters.speed[0] + (parameters.pitchOffset ? parameters.pitchOffset[0] : 0);
            let currentMorph = parameters.morph[0];

            // NEW: Add the filter variables here!
            let currentCutoff = parameters.cutoff[0];
            let currentRes = parameters.res[0];

            for (let mod of this.modMatrix) {
                const modVal = this.modValues[mod.source] || 0;
                const amt = mod.amount || 0;
                const dest = mod.dest ? mod.dest.toLowerCase().trim() : "";

                if (dest === 'radius') currentRadius += modVal * amt * 0.4; 
                if (dest === 'speed') currentSpeed += modVal * amt * 500; 
                if (dest === 'morph') currentMorph += (modVal * amt * currentMaxL);

                if (dest === 'cutoff') currentCutoff += modVal * amt * 1000; // Adjust as needed
                if (dest === 'res') currentRes += modVal * amt * 0.5; // Adjust as needed
            }

            currentRadius = Math.max(0.001, Math.min(0.5, currentRadius));
            currentMorph = Math.max(0, Math.min(currentMaxL, currentMorph));
            currentCutoff = Math.max(20, Math.min(20000, currentCutoff));
            currentRes = Math.max(0.01, Math.min(1.0, currentRes));

            // --- C. MOVEMENT & LOOKUP ---
            this.theta += (2 * Math.PI * currentSpeed / sampleRate);
            this.theta %= (2 * Math.PI);

            let x = parameters.centerX[0] + (Math.cos(this.theta) * currentRadius * parameters.squeezeX[0]);
            let y = parameters.centerY[0] + (Math.sin(this.theta) * currentRadius * parameters.squeezeY[0]);

            x = ((x % 1) + 1) % 1;
            y = ((y % 1) + 1) % 1;
            const tx = Math.floor(x * 511);
            const ty = Math.floor(y * 511);

            // --- D. TERRAIN INTERPOLATION ---
            const gridSize = 512 * 512;
            const timesBlockOffset = this.numLayers * gridSize;
            const layerA = Math.floor(currentMorph);
            const layerB = Math.min(layerA + 1, currentMaxL);
            const morphMix = currentMorph - layerA;

            const idxA = (layerA * gridSize) + (ty * 512 + tx);
            const idxB = (layerB * gridSize) + (ty * 512 + tx);

            const baseA = this.terrainBuffer[idxA] || 0;
            const modA = this.terrainBuffer[idxA + timesBlockOffset] || 0;
            const processedA = baseA + (baseA * modA * xmodAmt);

            const baseB = this.terrainBuffer[idxB] || 0;
            const modB = this.terrainBuffer[idxB + timesBlockOffset] || 0;
            const processedB = baseB + (baseB * modB * xmodAmt);

            const targetSample = processedA + (processedB - processedA) * morphMix;
            
            // De-clunker smoothing
            const smoothed = this.lastSample + 0.2 * (targetSample - this.lastSample);
            this.lastSample = smoothed;

            // --- E. ADSR MACHINE ---
            // If gate is on, move toward 1.0 (Attack), then down to Sustain level (Decay)
            if (gate > 0.5) {
                if (this.currentEnv < 1.0) {
                    this.currentEnv += (1.0 / (atk * sampleRate)); // Attack
                } else if (this.currentEnv > sus) {
                    this.currentEnv -= (1.0 / (dec * sampleRate)); // Decay
                }
            } else {
                if (this.currentEnv > 0) {
                    this.currentEnv -= (1.0 / (rel * sampleRate)); // Release
                }
            }
            this.currentEnv = Math.max(0, Math.min(1, this.currentEnv));

            // --- F. NOISE & SAFETY SHIELD ---
            const noiseVal = (Math.random() * 2 - 1) * noiseAmt;
            const signalWithEnv = (smoothed + noiseVal) * this.currentEnv;

            const hpf_alpha = 0.997; 
            this.hpf_out = hpf_alpha * (this.hpf_out + signalWithEnv - this.hpf_in_prev);
            this.hpf_in_prev = signalWithEnv;

            // --- G. STATE VARIABLE FILTER (SVF) ---
            const f = 2.0 * Math.sin(Math.PI * currentCutoff / sampleRate);
            const q = 1.0 - currentRes;

            const f_high = this.hpf_out - this.f_low - q * this.f_band;
            this.f_band = f * f_high + this.f_band;
            this.f_low = f * this.f_band + this.f_low;

            output[i] = this.f_low;

            // --- H. UI SYNC WITH SHAKE ---
            this.counter++;
            if (this.counter % 128 === 0) {
                // Add noise jitter back to the UI orbit so it "shimmers"
                const uiShake = noiseAmt * 0.05;
                this.port.postMessage({
                    x: x + (Math.random() * 2 - 1) * uiShake, 
                    y: y + (Math.random() * 2 - 1) * uiShake,
                    amplitude: this.f_low,
                    morph: currentMorph
                });
            }
        }
        return true;
    }
}


registerProcessor('terrain-synth-processor', TerrainSynthProcessor);