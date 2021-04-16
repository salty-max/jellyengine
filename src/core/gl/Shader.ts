import { gl } from './GL';

/**
 * @desc Represents a WebGL shader
 */
export class Shader {
    private _name: string;
    private _program!: WebGLProgram;
    private _attributes: { [name: string]: number } = {};

    /**
     * @desc Creates a new shader
     * @param {string} [name] The shader name
     * @param {string} [vertexSource] The source of the vertex shader
     * @param {string} [fragmentSource] The source of the fragment shader
     */
    public constructor(name: string, vertexSource: string, fragmentSource: string) {
        this._name = name;
        const vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
        const fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

        this.createProgram(vertexShader, fragmentShader);
        this.detectAttributes();
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

    /**
     * @desc Gets the location of an attribute with the provided name
     * @param {string} name The name of the attribute
     * @returns {number} The attribute location
     */
    public getAttributeLocation(name: string): number {
        if (this._attributes[name] === undefined) {
            throw new Error(`Unable to find attribute named ${name} in shader named ${this._name}`);
        }
        return this._attributes[name];
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

    private detectAttributes(): void {
        const attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attributeCount; i++) {
            const attributeInfo: WebGLActiveInfo = gl.getActiveAttrib(
                this._program,
                i,
            ) as WebGLActiveInfo;

            if (!attributeInfo) {
                break;
            }

            this._attributes[attributeInfo.name] = gl.getAttribLocation(
                this._program,
                attributeInfo.name,
            );
        }
    }
}
