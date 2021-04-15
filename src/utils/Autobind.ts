/**
 * AUTOBIND DECORATOR
 *
 * JELLY ENGINE
 * Maxime Blanc
 * https://github.com/salty-max
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
