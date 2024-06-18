import { useEffect, useState } from 'react';

function getMediaQuery(size: number) {
    return matchMedia(`(min-width: ${size}px)`);
}

export function useBreakpoint(size: number): boolean {
    const [isMatched, setIsMatched] = useState(() => {
        return getMediaQuery(size).matches;
    });

    useEffect(() => {
        const query = getMediaQuery(size);

        const handler = () => setIsMatched(query.matches);

        query.addEventListener('change', handler);
        handler();

        return () => {
            query.removeEventListener('change', handler);
        };
    }, [size]);

    return isMatched;
}

export function useDesktop() {
    // todo: magic number :(
    return useBreakpoint(1024);
}
