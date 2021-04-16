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
     * @param {number} width The canvas width
     * @param {number} height The canvas height
     * @param {string} [elementId] The HTML element to render into
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

    /**
     * @static
     * @desc Gets the byte size of a given data type
     * @param {number} dataType The data type to measure
     * @returns {number} The byte size of the data type
     */
    public static getByteSize(dataType: number): number {
        switch (dataType) {
            case gl.FLOAT:
            case gl.INT:
            case gl.UNSIGNED_INT:
                return 4;
                break;
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
                return 2;
                break;
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
                return 1;
                break;
            default:
                throw new Error(`Unrecognized data type ${dataType}`);
        }
    }
}
