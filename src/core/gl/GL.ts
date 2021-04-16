/**
 * @desc The WebGL rendering context
 * @type {WebGLRenderingContext}
 */
export let gl: WebGLRenderingContext;

/**
 * @desc Responsible for setting up a WebGL rendering context
 */
export class GLUtils {
    /**
     * @static
     * @desc Initializes WebGL
     * @param {number} [width] The canvas width
     * @param {number} [height] The canvas height
     * @param {string|undefined} [elementId] The HTML element to render into
     * @return {HTMLCanvasElement} The canvas where WebGL is rendered into
     */
    public static initialize(width: number, height: number, elementId?: string): HTMLCanvasElement {
        let canvas: HTMLCanvasElement;

        if (elementId !== undefined) {
            canvas = document.getElementById(elementId) as HTMLCanvasElement;

            if (!canvas) {
                throw new Error(`Cannot find a canvas element named ${elementId}`);
            }
        } else {
            canvas = document.createElement('canvas') as HTMLCanvasElement;
            canvas.width = width;
            canvas.height = height;
            document.body.appendChild(canvas);
        }

        gl = canvas.getContext('webgl')!;

        if (!gl) {
            throw new Error('Unable to initialize WebGL');
        }

        return canvas;
    }
}
