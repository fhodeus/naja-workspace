import { useCallback, useRef } from 'react';

/**
 * Returns a function of which is guarenteed to only fire once per microtask
 * @param func
 * @returns
 */
export function useImmediate<T>(func: (...args: T[]) => void) {
    const hasCalled = useRef(false);
    return useCallback(
        (...args: T[]) => {
            if (hasCalled.current) {
                return;
            }

            hasCalled.current = true;
            Promise.resolve().then(() => {
                func(...args);
                hasCalled.current = false;
            });
        },
        [func],
    );
}
