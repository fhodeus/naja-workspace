/**
 * Generates a random pastel color hex string.
 * @returns
 */
export function randomPastelColor(): string {
    return hslToHex(360 * Math.random(), 25 + 70 * Math.random(), 80 + 15 * Math.random());
}

/**
 * Converts hsl format color into a hex string.
 *
 * @param hue
 * @param saturation
 * @param lightness
 * @returns string hex representation of the color eg. #101010
 */
export function hslToHex(hue: number, saturation: number, lightness: number) {
    const normalizedLightness = lightness / 100;
    const modifier = (saturation * Math.min(normalizedLightness, 1 - normalizedLightness)) / 100;
    const getSegment = (offset: number) => {
        const rgbSegment = (offset + hue / 30) % 12;
        const color =
            normalizedLightness -
            modifier * Math.max(Math.min(rgbSegment - 3, 9 - rgbSegment, 1), -1);
        return valueToHex(color);
    };
    return `#${getSegment(0)}${getSegment(8)}${getSegment(4)}`;
}

/**
 * Converts a numeric value in the range of 0-255 to
 * its hex equivalent
 * @param value
 * @returns
 */
function valueToHex(value: number) {
    return Math.round(255 * value)
        .toString(16)
        .padStart(2, '0');
}
