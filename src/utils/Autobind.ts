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
