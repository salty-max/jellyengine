/**
 * @desc Decorator to auto bing this on a function
 * @param {unknown} _
 * @param {string} __
 * @param {PropertyDescriptor} descriptor
 * @returns {PropertyDescriptor}
 */
export function Autobind(
    _: unknown,
    __: string,
    descriptor: PropertyDescriptor,
): PropertyDescriptor {
    const method = descriptor.value;
    return {
        configurable: true,
        get() {
            return method.bind(this);
        },
    };
}
