import { describe, it, expect } from 'vitest';

import { hslToHex } from './colors';

describe('#hslToHex', () => {
    it('should return the hex code with a preceding hash symbol', () => {
        expect(hslToHex(0, 100, 50)).toMatch(/^#/);
    });

    it('should convert hue saturation and lightness to hex', () => {
        expect(hslToHex(0, 100, 50)).toEqual('#ff0000');
        expect(hslToHex(120, 100, 25)).toEqual('#008000');
        expect(hslToHex(120, 61, 50)).toEqual('#32cd32');
    });
});
