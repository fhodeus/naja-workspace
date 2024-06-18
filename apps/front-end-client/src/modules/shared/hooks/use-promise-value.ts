import { useEffect, useMemo, useRef, useState } from 'react';

export function usePromiseValue<T>(value?: Promise<T>): {
    data?: T;
    resolving: boolean;
} {
    const [data, setData] = useState<T | undefined>(undefined);
    const [resolving, setResolving] = useState(true);
    const ref = useRef(0);

    useEffect(() => {
        setData(undefined);
        setResolving(true);
        if (!value) {
            return;
        }

        // Avoid race conditions
        ref.current++;
        const id = ref.current;

        value?.then((response) => {
            if (id !== ref.current) {
                // Ignore: stale data...
                return;
            }

            setData(() => response);
            setResolving(false);
        });
    }, [value]);

    return useMemo(() => {
        return {
            data,
            resolving,
        };
    }, [data, resolving]);
}
