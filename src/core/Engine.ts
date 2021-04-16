import { Autobind } from '../utils/Autobind';
import { Colors, Palette } from '../utils/palette';
import { gl, GLUtils } from './gl/GL';
import { Shader } from './gl/Shader';

/**
 * @desc The Engine takes care of the main game loop
 */
class Engine {
    private _canvas: HTMLCanvasElement | undefined;
    private _gameWidth = 0;
    private _gameHeight = 0;
    private _shader: Shader | null;
    private _buffer: WebGLBuffer | null;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public constructor() {
        this._shader = null;
        this._buffer = null;
    }

    /**
     * @desc Starts the engine
     * @param {number|undefined} [width] The game width
     * @param {number|undefined} [height] The game height
     * @return {void} nothing
     */
    public start(width?: number, height?: number): void {
        this._gameWidth = width || window.innerWidth;
        this._gameHeight = height || window.innerHeight;
        this._canvas = GLUtils.initialize(this._gameWidth, this._gameHeight);
        gl.clearColor(...Palette[Colors.TrueBlue]);
        this.loadShaders();
        this._shader?.use();
        this.createBuffer();

        this.resize();
        this.loop();
    }

    /**
     * @desc Resizes the canvas to fit the window
     * @return {void}
     */
    public resize(): void {
        if (this._canvas) {
            this._canvas.width = this._gameWidth;
            this._canvas.height = this._gameHeight;
            gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        }
    }

    @Autobind
    private loop(): void {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        requestAnimationFrame(this.loop);
    }

    private createBuffer(): void {
        this._buffer = gl.createBuffer();

        const vertices = [
            // x, y, z
            0,
            0,
            0,
            0,
            0.5,
            0,
            0.5,
            0.5,
            0,
        ];

        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disableVertexAttribArray(0);
    }

    private loadShaders(): void {
        const vertexShaderSource = `
            attribute vec3 a_position;

            void main() {
                gl_Position = vec4(a_position, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;

            void main() {
                gl_FragColor = vec4(1.0);
            }
        `;

        this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);
    }
}

export default Engine;
