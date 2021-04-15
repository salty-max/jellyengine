import { Autobind } from '../utils/Autobind';
import { GL } from './GL';

/**
 * @desc The Engine takes care of the main game loop
 */
class Engine {
    private _count: number;
    private _canvas: HTMLCanvasElement;

    public constructor() {
        this._count = 0;
        this._canvas = GL.initialize();
        console.log('Engine started...');
    }

    /**
     * @desc Starts the engine
     * @return {void} nothing
     */
    public start(): void {
        this.loop();
    }

    @Autobind
    private loop(): void {
        this._count++;
        document.title = this._count.toString();
        requestAnimationFrame(this.loop);
    }
}

export default Engine;
