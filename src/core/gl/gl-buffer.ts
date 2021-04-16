import { gl, GLUtils } from './gl';

/**
 * @desc Represents the information needed for a GLBuffer attribute
 */
export class AttributeInfo {
    /**
     * @desc The location of this attribute
     */
    public location: number;
    /**
     * @desc The size (number of elements) in this attribute (i.e. Vector3 = 3)
     */
    public size: number;
    /**
     * @desc The number of elements from the beginning of the buffer
     */
    public offset: number;

    /**
     * @desc Creates a struct containing an attribute informations
     * @param {number} location The location of the attribute
     * @param {number} size The size of the attribute
     * @param {number} offset The number of elements from the beginning of the buffer
     */
    public constructor(location: number, size: number, offset: number) {
        this.location = location;
        this.size = size;
        this.offset = offset;
    }
}

/**
 * @desc Represents a WebGLBuffer
 */
export class GLBuffer {
    private _hasAttributeLocation = false;
    private _elementSize: number;
    private _stride: number;
    private _buffer: WebGLBuffer;

    private _targetBufferType: number;
    private _dataType: number;
    private _mode: number;
    private _typeSize: number;

    private _data: number[] = [];
    private _attributes: AttributeInfo[] = [];

    /**
     * @desc Creates a new GL buffer
     * @param {number} elementSize The size of each element in this buffer
     * @param {number} [dataType=gl.FLOAT] The data type of this buffer
     * @param {number} [targetBufferType=gl.ARRAY_BUFFER] The buffer target type. Can be either gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER
     * @param {number} [mode=gl.TRIANGLES] The drawing mode of this buffer (i.e. gl.TRIANGLES or gl.LINES)
     */
    public constructor(
        elementSize: number,
        dataType: number = gl.FLOAT,
        targetBufferType: number = gl.ARRAY_BUFFER,
        mode: number = gl.TRIANGLES,
    ) {
        this._elementSize = elementSize;
        this._dataType = dataType;
        this._targetBufferType = targetBufferType;
        this._mode = mode;

        // Determine byte size
        this._typeSize = GLUtils.getByteSize(this._dataType);
        this._stride = this._elementSize * this._typeSize;
        this._buffer = gl.createBuffer() as WebGLBuffer;
    }

    /**
     * @desc Destroy this buffer
     * @returns {void}
     */
    public destroy(): void {
        gl.deleteBuffer(this._buffer);
    }

    /**
     * @desc Binds this buffer
     * @param {boolean} [normalized=false] Indicates of the data should be normalized
     * @returns {void}
     */
    public bind(normalized = false): void {
        gl.bindBuffer(this._targetBufferType, this._buffer);

        if (this._hasAttributeLocation) {
            this._attributes.forEach((at) => {
                gl.vertexAttribPointer(
                    at.location,
                    at.size,
                    this._dataType,
                    normalized,
                    this._stride,
                    at.offset * this._typeSize,
                );
                gl.enableVertexAttribArray(at.location);
            });
        }
    }

    /**
     * @desc Unbinds this buffer
     * @returns {void}
     */
    public unbind(): void {
        this._attributes.forEach((at) => {
            gl.disableVertexAttribArray(at.location);
        });
        gl.bindBuffer(this._targetBufferType, this._buffer);
    }

    /**
     * @desc Adds an attribute to this buffer
     * @param {AttributeInfo} info The attribute to add to the buffer
     * @returns {void}
     */
    public addAttributeLocation(info: AttributeInfo): void {
        this._hasAttributeLocation = true;
        this._attributes.push(info);
    }

    /**
     * @desc Adds data to this buffer
     * @param {Array<number>} data The data to add to the buffer
     * @returns {void}
     */
    public pushBackData(data: number[]): void {
        data.forEach((d) => this._data.push(d));
    }

    /**
     * @desc Uploads this buffer's data to the GPU
     * @returns {void}
     */
    public upload(): void {
        gl.bindBuffer(this._targetBufferType, this._buffer);

        let bufferData: ArrayBufferView = new Float32Array(this._data);

        switch (this._dataType) {
            case gl.FLOAT:
                bufferData = new Float32Array(this._data);
                break;
            case gl.INT:
                bufferData = new Int32Array(this._data);
                break;
            case gl.UNSIGNED_INT:
                bufferData = new Uint32Array(this._data);
                break;
            case gl.SHORT:
                bufferData = new Int16Array(this._data);
                break;
            case gl.UNSIGNED_SHORT:
                bufferData = new Uint16Array(this._data);
                break;
            case gl.BYTE:
                bufferData = new Int8Array(this._data);
                break;
            case gl.UNSIGNED_BYTE:
                bufferData = new Uint8Array(this._data);
                break;
        }

        gl.bufferData(this._targetBufferType, bufferData, gl.STATIC_DRAW);
    }

    /**
     * @desc Draws this buffer
     * @returns {void}
     */
    public draw(): void {
        if (this._targetBufferType === gl.ARRAY_BUFFER) {
            gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
        } else if (this._targetBufferType === gl.ELEMENT_ARRAY_BUFFER) {
            gl.drawElements(this._mode, this._data.length, this._dataType, 0);
        }
    }
}
