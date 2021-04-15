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
     * @return {void} nothing
     */
    public start(): void {
        this._canvas = GLUtils.initialize();
        gl.clearColor(...Palette[Colors.TrueBlue]);

        console.log('Engine started...');
        this.loop();
    }

    @Autobind
    private loop(): void {
        gl.clear(gl.COLOR_BUFFER_BIT);
        requestAnimationFrame(this.loop);
    }
}

export default Engine;
