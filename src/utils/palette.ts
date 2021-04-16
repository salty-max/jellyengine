/**
 * @desc Table containing palette's colors rgba values
 */
export const Palette: { [name: string]: [number, number, number, number] } = {
    black: rgbaToGL([0, 0, 0, 255]), // #000000
    'dark-blue': rgbaToGL([29, 43, 83, 255]), // #1D2B53
    'dark-purple': rgbaToGL([126, 37, 83, 255]), // #7E2553
    'dark-green': rgbaToGL([0, 135, 81, 255]), // #008751
    brown: rgbaToGL([171, 82, 54, 255]), // #AB5236
    'dark-grey': rgbaToGL([95, 87, 79, 255]), // #5F574F
    'light-grey': rgbaToGL([194, 195, 199, 255]), // #C2C3C7
    white: rgbaToGL([255, 241, 232, 255]), // #FFF1E8
    red: rgbaToGL([255, 0, 77, 255]), // #FF004D
    orange: rgbaToGL([255, 163, 0, 255]), // #FFA300
    yellow: rgbaToGL([255, 236, 39, 255]), // #FFEC27
    green: rgbaToGL([0, 228, 54, 255]), // #00E436
    blue: rgbaToGL([41, 173, 255, 255]), // #29ADFF
    lavender: rgbaToGL([131, 118, 156, 255]), // #83769C
    pink: rgbaToGL([255, 119, 168, 255]), // #FF77A8
    'light-peach': rgbaToGL([255, 204, 170, 255]), // #FFCCAA
    'darkest-grey': rgbaToGL([41, 24, 20, 255]), // #291814
    'darker-blue': rgbaToGL([17, 29, 53, 255]), // #111D35
    'darker-purple': rgbaToGL([66, 33, 54, 255]), // #422136
    'blue-green': rgbaToGL([18, 83, 89, 255]), // #125359
    'dark-brown': rgbaToGL([116, 47, 41, 255]), // #742F29
    'darker-grey': rgbaToGL([73, 51, 59, 255]), // #49333B
    'medium-grey': rgbaToGL([162, 136, 121, 255]), // #A28879
    'light-yellow': rgbaToGL([243, 239, 125, 255]), // #F3EF7D
    'dark-red': rgbaToGL([190, 18, 80, 255]), // #BE1250
    'dark-orange': rgbaToGL([255, 108, 36, 255]), // #FF6C24
    'lime-green': rgbaToGL([168, 231, 46, 255]), // #A8E72E
    'medium-green': rgbaToGL([0, 181, 67, 255]), // #00B543
    'true-blue': rgbaToGL([6, 90, 181, 255]), // #065AB5
    mauve: rgbaToGL([117, 70, 101, 255]), // #754665
    'dark-peach': rgbaToGL([255, 110, 89, 255]), // #FF6E59
    peach: rgbaToGL([255, 157, 129, 255]), // #FF9D81
};

/**
 * @desc Converts RGBA values to WebGL values
 * @param {Array<number>} colors The RGBA values to convert
 * @returns {Array<number>}
 */
export function rgbaToGL(
    color: [number, number, number, number],
): [number, number, number, number] {
    return color.map((c) => (c > 0 ? c / 255 : 0)) as [number, number, number, number];
}

/**
 * @desc Gets a color from the palette
 * @param {string} color The color name
 * @returns {Array<number>} The rgba values of the color
 */
export function Color(color: string): [number, number, number, number] {
    return Palette[color];
}
