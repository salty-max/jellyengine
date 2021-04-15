/** @Filename Engine.ts */

import { Autobind } from '../utils/Autobind';

/**
 * @author Maxime Blanc <max@jellycat.fr>
 * @desc The Engine takes care of the main game loop
 */
class Engine {
    private _count: number;

    public constructor() {
        this._count = 0;
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
