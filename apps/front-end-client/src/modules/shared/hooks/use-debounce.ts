import { useCallback, useRef } from 'react';

export function useDebounce(callback: () => void) {
    const timeoutRef = useRef(0);
    const lastUpdate = useRef(Date.now());

    return useCallback(() => {
        if (Date.now() > lastUpdate.current + 100) {
            callback();
            clearTimeout(timeoutRef.current);
        } else {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
                callback();
            }, 100);
        }

        lastUpdate.current = Date.now();
    }, [callback]);
}
