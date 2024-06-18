type ClassValue = string | undefined | null | Record<string, boolean>;

/**
 * Helper method to combine array of class names or record of class names into
 * a single class name string.
 *
 * If an object is passed through it will check if the key values are truthy, if
 * so it will add the key as though it were a class name.
 *
 * Falsy values are filtered out.
 *
 * @param classNames
 * @returns concatenated class string
 */
export function createClassName(classNames: Array<ClassValue> | ClassValue) {
    if (!Array.isArray(classNames)) {
        classNames = [classNames];
    }

    return classNames
        .filter((value): value is NonNullable<ClassValue> => !!value)
        .map((value) => {
            return typeof value !== 'string' ? combineObject(value).join(' ') : value;
        })
        .join(' ');
}

/**
 * Converts a className -> boolean object to a single class string.
 * @param classNames
 * @returns
 */
function combineObject(classNames: Record<string, boolean>) {
    return Object.keys(classNames).reduce((accumulator, name) => {
        if (classNames[name]) {
            accumulator.push(name);
        }
        return accumulator;
    }, [] as string[]);
}

/**
 * Simple function to join an array of classes into a class
 * string.
 * @param classes Array of classes to join together, empty values are omitted
 * @returns
 */
export function classList(classes: Array<string | null | undefined | false>) {
    return classes.filter((value) => !!value).join(' ');
}

/**
 * Constructs a BEM compliant class name based on the name of the block, element
 * and given variant
 * @param block The block name, typically component name
 * @param element The element within the block
 * @param variant The variant/state/modifier to apply
 * @returns
 */
export function createClass(block: string, element?: string, variant?: string) {
    const className = [block];

    if (element) {
        className.push(`__${element}`);
    }

    if (variant) {
        className.push(`--${variant}`);
    }

    return className.join('');
}

/**
 * Transforms the variant object into a list of active variants.
 * @param variants A record of variant names to boolean value
 * @returns List of variant names that are active (truthy)
 */
export function getEnabledVariants(variants: Record<string, boolean>) {
    return Object.keys(variants).filter((key) => variants[key]);
}

/**
 * Creates a helper function to work with styles
 * @param styles The style name mappings returned by CSS Modules support
 * @param block The top level block name
 * @returns A function of which you can pass through the element name and variants map
 */
export function createStyleHelper(styles: Record<string, string>, block: string) {
    return (element = '', variants: Record<string, boolean> | string[] = []) => {
        const variantList = Array.isArray(variants) ? variants : getEnabledVariants(variants);

        return classList(
            [
                createClass(block, element),
                ...variantList.map((variant) => createClass(block, element, variant)),
            ].map((className) => styles[className]),
        );
    };
}
