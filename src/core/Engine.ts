import { Autobind } from '../utils/Autobind';
import { Color } from '../utils/palette';
import { gl, GLUtils } from './gl/GL';
import { AttributeInfo, GLBuffer } from './gl/GLBuffer';
import { Shader } from './gl/Shader';

/**
 * @desc The Engine takes care of the main game loop
 */
class Engine {
    private _canvas: HTMLCanvasElement | undefined;
    private _gameWidth = 0;
    private _gameHeight = 0;
    private _shader!: Shader;
    private _buffer!: GLBuffer;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public constructor() {}

    /**
     * @desc Starts the engine
     * @param {number} [width] The game width
     * @param {number} [height] The game height
     * @return {void} nothing
     */
    public start(width?: number, height?: number): void {
        this._gameWidth = width || window.innerWidth;
        this._gameHeight = height || window.innerHeight;
        this._canvas = GLUtils.initialize(this._gameWidth, this._gameHeight);
        gl.clearColor(...Color('dark-blue'));
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

        // Set uniforms
        const colorPosition = this._shader.getUniformLocation('u_color');
        gl.uniform4f(colorPosition, ...Color('true-blue'));

        this._buffer.bind();
        this._buffer.draw();

        requestAnimationFrame(this.loop);
    }

    private createBuffer(): void {
        this._buffer = new GLBuffer(3);

        const positionAttribute = new AttributeInfo(
            this._shader.getAttributeLocation('a_position'),
            3,
            0,
        );
        this._buffer.addAttributeLocation(positionAttribute);

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

        this._buffer.pushBackData(vertices);
        this._buffer.upload();
        this._buffer.unbind();
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

            uniform vec4 u_color;

            void main() {
                gl_FragColor = u_color;
            }
        `;

        this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);
    }
}

export default Engine;
