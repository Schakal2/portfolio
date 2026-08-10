/**
 * main.js
 */
const engine = new TerrainEngine();

engine.presets.onLoad((data) => {
    if (!data) return;
    console.log("📂 Loading Preset:", data.name);

    // 1. Restore the stack properly
    engine.terrain.stack = data.terrainStack.map(l => ({
        plus: new Float32Array(l.plus),
        times: l.times ? new Float32Array(l.times) : new Float32Array(512 * 512)
    }));

    // 2. Update the Slider BOUNDARIES before setting the value
    const morphSlider = document.getElementById('morph');
    if (morphSlider) {
        const stackSize = engine.terrain.stack.length;
        // If stack has 2 layers, max should be 1.0
        morphSlider.max = Math.max(0, stackSize - 1);
        
        const savedMorph = data.params && data.params['morph'] !== undefined ? data.params['morph'] : 0;
        morphSlider.value = savedMorph;
    }

    // 3. Sync all other parameters
    if (data.params) {
        for (const [id, val] of Object.entries(data.params)) {
            if (id === 'morph') continue; // Handled above
            engine.handleParamChange(id, val);
            const el = document.getElementById(id);
            if (el) {
                if (el.type === 'checkbox') el.checked = !!val;
                else el.value = val;
            }
        }
    }

    // 4. Force a visual/audio refresh now that the stack is loaded
    if (engine.terrain.stack.length > 0) {
        engine.updateVisualLayers(parseFloat(morphSlider.value));
        if (engine.audio.node) engine.audio.syncStack(engine.terrain.stack);
    }
});

async function boot() {
    await engine.visuals.init();
    const keys = await engine.presets.init(); 
    if (keys && keys.length > 0) await engine.presets.loadPreset(keys[0]);
    
    // Kick off the visualizer loop
    engine.visuals.render();
}

document.getElementById('start-audio').addEventListener('click', async () => {
    await engine.audio.init();
    if (engine.terrain.stack.length > 0) {
        engine.audio.syncStack(engine.terrain.stack);
        // Initial sync of all sliders to the Worklet
        document.querySelectorAll('input[type=range]').forEach(s => {
            engine.audio.updateParam(s.id, parseFloat(s.value));
        });
        engine.audio.triggerEnvelope(document.getElementById('drone-mode').checked);
    }
});

// START
boot();