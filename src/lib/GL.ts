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
     * @param {string|undefined} [elementId] The HTML element to render into
     * @param {number|undefined} [width] The canvas width
     * @param {number|undefined} [height] The canvas height
     * @return {HTMLCanvasElement} The canvas where WebGL is rendered into
     */
    public static initialize(
        elementId?: string,
        width?: number,
        height?: number,
    ): HTMLCanvasElement {
        let canvas: HTMLCanvasElement;

        if (elementId !== undefined) {
            canvas = document.getElementById(elementId) as HTMLCanvasElement;

            if (canvas === undefined) {
                throw new Error(`Cannot find a canvas element named ${elementId}`);
            }
        } else {
            canvas = document.createElement('canvas') as HTMLCanvasElement;
            canvas.width = width || window.innerWidth;
            canvas.height = height || window.innerHeight;
            document.body.appendChild(canvas);
        }

        gl = canvas.getContext('webgl')!;

        if (gl === undefined) {
            throw new Error('Unable to initialize WebGL');
        }

        return canvas;
    }
}
