import deepEqual from 'fast-deep-equal/es6';

export function isDeepEqual(objectA: unknown, objectB: unknown) {
    return deepEqual(objectA, objectB);
}
