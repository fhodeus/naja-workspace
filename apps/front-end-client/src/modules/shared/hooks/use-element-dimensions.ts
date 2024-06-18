import { useCallback, useMemo, useState } from 'react';

export function useInitialElementDimensions() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const measurementRef = useCallback((node: Element | null) => {
        if (!node) {
            return;
        }

        setWidth(node.getBoundingClientRect().width);
        setHeight(node.getBoundingClientRect().width);
    }, []);

    return useMemo(
        () => ({
            measurementRef,
            width,
            height,
        }),
        [width, height, measurementRef],
    );
}
