/**
 * VisualManager.js - Mark II
 * Handles WebGL rendering, shaders, and terrain morphing.
 */
class VisualManager {
    constructor(canvas3dId, canvas2dId) {
        this.vertexShaderSource = `
            attribute vec3 aPosition;
            attribute float aHeight;      
            attribute float aHeightMod;   
            attribute float aHeightNext;  
            attribute float aHeightNextMod;

            varying float vHeight;
            varying float vDistToPlayhead; 

            uniform mat4 uProjection;
            uniform mat4 uView;
            uniform vec2 uPlayhead; 
            uniform float uMorph;         
            uniform float uXMod;          

            void main() {
                // 1. Calculate XMod for both possible layers
                float currentVal = aHeight + (aHeight * aHeightMod * uXMod);
                float nextVal = aHeightNext + (aHeightNext * aHeightNextMod * uXMod);
                
                // 2. Blend based on Morph
                float finalBlendedHeight = mix(currentVal, nextVal, uMorph);
                
                vHeight = finalBlendedHeight;
                
                vec2 normPos = aPosition.xy + 0.5;
                vDistToPlayhead = distance(normPos, uPlayhead);

                vec3 pos = vec3(aPosition.x, finalBlendedHeight * 0.4, aPosition.y);
                
                gl_Position = uProjection * uView * vec4(pos, 1.0);
                gl_PointSize = 1.0; 
            }
        `;

        this.fragmentShaderSource = `
            precision mediump float;
            varying float vHeight;
            varying float vDistToPlayhead;
            uniform float uLayerOpacity; 

            void main() {
                vec3 lowColor = vec3(0.05, 0.1, 0.2);
                vec3 highColor = vec3(0.0, 1.0, 0.6);
                vec3 terrainColor = mix(lowColor, highColor, (vHeight + 1.0) * 0.5);
                
                float glow = smoothstep(0.05, 0.0, vDistToPlayhead);
                vec3 finalColor = mix(terrainColor, vec3(1.0, 1.0, 1.0), glow);
                
                float alpha = max(uLayerOpacity, 0.8) + glow;
                gl_FragColor = vec4(finalColor, alpha);
            }
        `;
        this.canvasIds = { '3d': canvas3dId, '2d': canvas2dId };
        this.engines = { '3d': null, '2d': null };
        this.engine = null; // Reference to the brain (TerrainEngine)
    }

    init() {
        this.engines['3d'] = this.setupContext(this.canvasIds['3d']);
        this.engines['2d'] = this.setupContext(this.canvasIds['2d']);
        console.log("🚀 Dual WebGL Engines Initialized");
    }

    setupContext(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;

        const gl = canvas.getContext('webgl');
        if (!gl) return null;

        canvas.width = 512;
        canvas.height = 512;
        gl.viewport(0, 0, 512, 512);

        const vs = this.createShader(gl, gl.VERTEX_SHADER, this.vertexShaderSource);
        const fs = this.createShader(gl, gl.FRAGMENT_SHADER, this.fragmentShaderSource);
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        // 1. Static Positions
        const positions = new Float32Array(512 * 512 * 3);
        for (let y = 0; y < 512; y++) {
            for (let x = 0; x < 512; x++) {
                const i = (y * 512 + x) * 3;
                positions[i] = (x / 511.0) - 0.5;
                positions[i+1] = (y / 511.0) - 0.5;
                positions[i+2] = 0;
            }
        }
        const posBuf = this.makeBuffer(gl, positions, program, "aPosition", 3);

        // 2. Dynamic Height Buffers (The 4 essential buffers for Mark II)
        const heightBuf = this.makeBuffer(gl, null, program, "aHeight", 1);
        const heightModBuf = this.makeBuffer(gl, null, program, "aHeightMod", 1);
        const heightNextBuf = this.makeBuffer(gl, null, program, "aHeightNext", 1);
        const heightNextModBuf = this.makeBuffer(gl, null, program, "aHeightNextMod", 1);

        const opacityLoc = gl.getUniformLocation(program, "uLayerOpacity");
        gl.uniform1f(opacityLoc, 1.0);

        return { gl, program, heightBuf, heightModBuf, heightNextBuf, heightNextModBuf };
    }

    makeBuffer(gl, data, program, attribName, size) {
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        if (data) gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        else gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(512 * 512), gl.DYNAMIC_DRAW);
        
        const loc = gl.getAttribLocation(program, attribName);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
        return buf;
    }

    updateTerrain(currentLayer, nextLayer) {
        const firstEng = Object.values(this.engines)[0];
        if (!firstEng || !firstEng.heightBuf) return;

        const standardize = (data) => {
            if (!data) return { plus: new Float32Array(512*512), times: new Float32Array(512*512) };
            if (data instanceof Float32Array) return { plus: data, times: data };
            return { 
                plus: data.plus || new Float32Array(512*512), 
                times: data.times || data.plus || new Float32Array(512*512) 
            };
        };

        const layerA = standardize(currentLayer);
        const layerB = standardize(nextLayer);

        Object.values(this.engines).forEach(eng => {
            if (!eng || !eng.gl) return;
            const gl = eng.gl;
            gl.useProgram(eng.program);

            gl.bindBuffer(gl.ARRAY_BUFFER, eng.heightBuf);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, layerA.plus);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, eng.heightModBuf);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, layerA.times);

            gl.bindBuffer(gl.ARRAY_BUFFER, eng.heightNextBuf);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, layerB.plus);

            gl.bindBuffer(gl.ARRAY_BUFFER, eng.heightNextModBuf);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, layerB.times);
        });
    }

    render() {
    if (!this.engine || !this.engine.orbit) {
        requestAnimationFrame(() => this.render());
        return;
    }

    const currentMorph = this.engine.getModulatedParam('morph');
    
    // ADD THIS: Ensure the GPU always has the layers surrounding the current morph
    this.engine.updateVisualLayers(currentMorph);

    const angle = Date.now() * (parseFloat(document.getElementById('view-rotate-speed')?.value) || 0);
    const currentXMod = this.engine.getModulatedParam('xmod');
    
    // Calculate the decimal (0.0 to 1.0) to send to the shader
    const morphFraction = currentMorph - Math.floor(currentMorph);

    this.renderToContext(this.engines['3d'], this.engine.orbit, angle, true, morphFraction, currentXMod);
    this.renderToContext(this.engines['2d'], this.engine.orbit, 0, false, morphFraction, currentXMod);

    requestAnimationFrame(() => this.render());
}

    renderToContext(engine, orbit, angle, is3D, morphFactor, xmodFactor) {
        if (!engine || !engine.gl) return;
        const { gl, program } = engine;
        gl.useProgram(program);

        gl.uniform1f(gl.getUniformLocation(program, "uMorph"), morphFactor);
        gl.uniform1f(gl.getUniformLocation(program, "uXMod"), xmodFactor);
        gl.uniform2f(gl.getUniformLocation(program, "uPlayhead"), orbit.currentX || 0.5, orbit.currentY || 0.5);

        const pLoc = gl.getUniformLocation(program, "uProjection");
        const vLoc = gl.getUniformLocation(program, "uView");
        
        const pMatrix = this.createPerspectiveMatrix(45, 1, 0.1, 100);
        let vMatrix;
        
        if (is3D) {
            const c = Math.cos(angle);
            const s = Math.sin(angle);
            vMatrix = new Float32Array([
                c, -0.2*s, -s, 0,
                0, 0.9, 0, 0,
                s, 0.2*c, c, 0,
                0, -0.3, -2.0, 1
            ]);
        } else {
            vMatrix = new Float32Array([1,0,0,0, 0,0,1,0, 0,-1,0,0, 0,0,-1.5,1]);
        }

        gl.uniformMatrix4fv(pLoc, false, pMatrix);
        gl.uniformMatrix4fv(vLoc, false, vMatrix);

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        
        gl.drawArrays(gl.POINTS, 0, 512 * 512);
    }

    createPerspectiveMatrix(fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy * Math.PI / 360);
        const rangeInv = 1.0 / (near - far);
        return new Float32Array([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, (2 * near * far) * rangeInv, 0
        ]);
    }

    createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }
}