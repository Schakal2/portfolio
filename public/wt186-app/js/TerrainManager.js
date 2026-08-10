/**
 * TerrainManager.js - Mark III
 * Strictly handles pairing and raw data processing.
 */
class TerrainManager {
    constructor() {
        this.stack = [];
    }

    async getRawAudioData(file, audioCtx) {
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        return audioBuffer.getChannelData(0);
    }

    async decodeImage(file) {
        const img = new Image();
        const url = URL.createObjectURL(file);
        return new Promise((resolve, reject) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = canvas.height = 512;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 512, 512);
                const imageData = ctx.getImageData(0, 0, 512, 512).data;
                URL.revokeObjectURL(url);
                resolve(this.generateMatrices(imageData, null, 'image'));
            };
            img.src = url;
        });
    }

    generateMatrices(sourceA, sourceB, type) {
        const plus = new Float32Array(512 * 512);
        const times = new Float32Array(512 * 512);

        if (type === 'audio') {
            for (let y = 0; y < 512; y++) {
                // If sourceB is null, Y is 0 (boring extruded shape)
                const vY = sourceB ? sourceB[Math.floor((y / 511) * (sourceB.length - 1))] : 0;
                for (let x = 0; x < 512; x++) {
                    const vX = sourceA[Math.floor((x / 511) * (sourceA.length - 1))];
                    plus[y * 512 + x] = (vX + vY) * 0.5; 
                    times[y * 512 + x] = vX * vY; 
                }
            }
        } else if (type === 'image') {
            for (let i = 0; i < 512 * 512; i++) {
                const r = sourceA[i * 4], g = sourceA[i * 4 + 1], b = sourceA[i * 4 + 2];
                const val = ((r + g + b) / 3 / 255 * 2) - 1;
                plus[i] = val;
                times[i] = Math.pow(val, 3);
            }
        }

        const layer = { plus, times };
        this.stack.push(layer);
        return this.stack.length - 1;
    }

    updateMatrices(index, sourceA, sourceB) {
        if (!this.stack[index]) return;
        const plus = new Float32Array(512 * 512);
        const times = new Float32Array(512 * 512);

        for (let y = 0; y < 512; y++) {
            const vY = sourceB[Math.floor((y / 511) * (sourceB.length - 1))];
            for (let x = 0; x < 512; x++) {
                const vX = sourceA[Math.floor((x / 511) * (sourceA.length - 1))];
                plus[y * 512 + x] = (vX + vY) * 0.5;
                times[y * 512 + x] = vX * vY; 
            }
        }
        this.stack[index] = { plus, times };
    }

    parseSVGPath(svgText) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const path = svgDoc.querySelector('path');
        const svg = svgDoc.querySelector('svg');
        if (!path || !svg) return new Float32Array(2048);
        const length = path.getTotalLength();
        const points = new Float32Array(2048);
        const w = svg.getAttribute('width') || 512;
        const h = svg.getAttribute('height') || 512;
        for (let i = 0; i < 1024; i++) {
            const pt = path.getPointAtLength((i / 1024) * length);
            points[i * 2] = pt.x / w;
            points[i * 2 + 1] = pt.y / h;
        }
        return points;
    }
}