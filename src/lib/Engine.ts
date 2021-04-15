import { Autobind } from '../utils/Autobind';

export default class Engine {
    private _count: number;

    public constructor() {
        this._count = 0;
    }

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
