import { gl } from './GL';

/**
 * @desc Represents a WebGL shader
 */
export class Shader {
    private _name: string;
    private _program: WebGLProgram | null;

    /**
     * @desc Creates a new shader
     * @param {string} [name] The shader name
     * @param {string} [vertexSource] The source of the vertex shader
     * @param {string} [fragmentSource] The source of the fragment shader
     */
    public constructor(name: string, vertexSource: string, fragmentSource: string) {
        this._name = name;
        this._program = null;
        const vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
        const fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

        this.createProgram(vertexShader, fragmentShader);
    }

    /**
     * @desc The name of the shader
     * @return {string} Shader name
     */
    public get name(): string {
        return this._name;
    }

    /**
     * @desc Tells WebGL to use the shader
     * @return {void}
     */
    public use(): void {
        gl.useProgram(this._program);
    }

    private loadShader(source: string, shaderType: number): WebGLShader {
        const shader: WebGLShader = gl.createShader(shaderType) as WebGLShader;

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        const error = gl.getShaderInfoLog(shader);
        if (error) {
            throw new Error(`Error compiling shader ${this._name}: ${error}`);
        }

        return shader;
    }

    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
        this._program = gl.createProgram() as WebGLProgram;
        gl.attachShader(this._program, vertexShader);
        gl.attachShader(this._program, fragmentShader);

        gl.linkProgram(this._program);

        const error = gl.getProgramInfoLog(this._program);
        if (error) {
            throw new Error(`Error linking shader ${this._name}: ${error}`);
        }
    }
}
