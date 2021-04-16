import { Autobind } from '../utils/Autobind';
import { Colors, Palette } from '../utils/palette';
import { gl, GLUtils } from './gl/GL';
import { Shader } from './gl/Shader';

/**
 * @desc The Engine takes care of the main game loop
 */
class Engine {
    private _canvas: HTMLCanvasElement | undefined;
    private _shader: Shader | null;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public constructor() {
        this._shader = null;
    }

    /**
     * @desc Starts the engine
     * @param {number|undefined} [width] The game width
     * @param {number|undefined} [height] The game height
     * @return {void} nothing
     */
    public start(width?: number, height?: number): void {
        this._canvas = GLUtils.initialize(undefined, width, height);
        gl.clearColor(...Palette[Colors.TrueBlue]);
        this.loadShaders();
        this._shader?.use();
        this.loop();
    }

    /**
     * @desc Resizes the canvas to fit the window
     * @return {void}
     */
    public resize(): void {
        if (this._canvas !== undefined) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
        }
    }

    @Autobind
    private loop(): void {
        gl.clear(gl.COLOR_BUFFER_BIT);
        requestAnimationFrame(this.loop);
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
