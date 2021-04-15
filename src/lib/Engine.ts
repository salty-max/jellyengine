import { Autobind } from '../utils/Autobind';
import { Colors, Palette } from '../utils/palette';
import { gl, GLUtils } from './GL';

/**
 * @desc The Engine takes care of the main game loop
 */
class Engine {
    private _canvas: HTMLCanvasElement | undefined;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public constructor() {}

    /**
     * @desc Starts the engine
     * @param {number|undefined} [width] The game width
     * @param {number|undefined} [height] The game height
     * @return {void} nothing
     */
    public start(width?: number, height?: number): void {
        this._canvas = GLUtils.initialize(undefined, width, height);
        gl.clearColor(...Palette[Colors.TrueBlue]);

        console.log('Engine started...');
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
}

export default Engine;
