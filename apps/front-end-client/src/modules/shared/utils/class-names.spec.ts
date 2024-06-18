import { describe, it, expect } from 'vitest';

import {
    classList,
    createClass,
    createStyleHelper,
    getEnabledVariants,
    createClassName,
} from './class-names';

describe('#createClassName', () => {
    it('should return the class name provided to it', () => {
        expect(createClassName('hello-world')).toEqual('hello-world');
    });

    it('should concatenate the array of classnames provided to it', () => {
        expect(createClassName(['hello', 'world'])).toEqual('hello world');
    });

    it('should remove empty values from the array of classnames provided to it', () => {
        expect(createClassName(['hello', null, undefined, '', 'world'])).toEqual('hello world');
    });

    it('should accept a object of classnames to enabled state', () => {
        expect(
            createClassName({
                'is-enabled': true,
                'is-disabled': false,
                'do-something': true,
            }),
        ).toEqual('is-enabled do-something');
    });

    it('should accept an array of class enabled state objects or strings', () => {
        expect(
            createClassName([
                { hello: true, world: false },
                'another-class',
                { more: true },
                undefined,
                null,
                'final',
            ]),
        ).toEqual('hello another-class more final');
    });
});

describe('#classList', () => {
    it('should return a single class when a single class is given', () => {
        expect(classList(['hello'])).toEqual('hello');
    });

    it('should combine a list of classes', () => {
        expect(classList(['hello', 'world', 'cool'])).toEqual('hello world cool');
    });

    it('should filter out falsy classes', () => {
        expect(classList(['hello', false, undefined, '', 'world'])).toEqual('hello world');
    });
});

describe('#createClass', () => {
    it('should return a valid bem classname when just given the block', () => {
        expect(createClass('hello')).toEqual('hello');
    });

    it('should return a bem classname when given a element and block', () => {
        expect(createClass('hello', 'world')).toEqual('hello__world');
    });

    it('should return a bem classname when given a element, block and variant', () => {
        expect(createClass('hello', 'world', 'is-enabled')).toEqual('hello__world--is-enabled');
    });
});

describe('#getEnabledVariants', () => {
    it('should return the key if the value is true', () => {
        expect(
            getEnabledVariants({
                hello: true,
            }),
        ).toMatchObject(['hello']);
    });

    it('should not return a variant if the value is false', () => {
        expect(
            getEnabledVariants({
                hello: false,
            }),
        ).toMatchObject([]);
    });

    it('should work with multiple variants and values', () => {
        expect(
            getEnabledVariants({
                hello: false,
                world: true,
                bleh: true,
            }),
        ).toMatchObject(['world', 'bleh']);
    });
});

describe('#createStyleHelper', () => {
    it('should create a helper function', () => {
        expect(createStyleHelper({ x: 'x' }, 'x')).toBeInstanceOf(Function);
    });

    it('should be callable to return a valid class name from the styles map', () => {
        const helper = createStyleHelper({ x: 'y' }, 'x');
        expect(helper()).toEqual('y');
    });

    it('should be callable to return a valid block & element class name from the styles map', () => {
        const helper = createStyleHelper({ x__y: 'block__element' }, 'x');
        expect(helper('y')).toEqual('block__element');
    });

    it('should accept a variant as an array', () => {
        const helper = createStyleHelper(
            {
                'x__y': 'block__element',
                'x__y--z': 'block__element--variant',
            },
            'x',
        );
        expect(helper('y', ['z'])).toEqual('block__element block__element--variant');
    });

    it('should accept multiple variants as an array', () => {
        const helper = createStyleHelper(
            {
                'x__y': 'block__element',
                'x__y--z': 'block__element--variant',
                'x__y--a': 'block__element--variant2',
            },
            'x',
        );
        expect(helper('y', ['z', 'a'])).toEqual(
            'block__element block__element--variant block__element--variant2',
        );
    });

    it('should accept multiple variants as an object', () => {
        const helper = createStyleHelper(
            {
                'x__y': 'block__element',
                'x__y--z': 'block__element--variant',
                'x__y--a': 'block__element--variant2',
                'x__y--b': 'block__element--variant3',
            },
            'x',
        );

        expect(
            helper('y', {
                a: true,
                b: true,
            }),
        ).toEqual('block__element block__element--variant2 block__element--variant3');
    });
});
