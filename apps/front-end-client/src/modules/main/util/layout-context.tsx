import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { FCWithChildren } from '../../shared/utils/component.interface';

interface ILayoutContext {
    showNavButtons: boolean;
    showMobileBackground?: boolean;
    showSearch?: boolean;
    title?: string;
    /**
     * Ensures the containing layout allows for full width content
     */
    isFullWidth?: boolean;

    /**
     * Ensures the layouts container takes exactly the remaining
     * available height. (in essence. 100vh - nav height with footer offscreen)
     */
    isFixedHeight?: boolean;
}

const DEFAULT_CONTEXT: ILayoutContext = {
    showNavButtons: true,
    showMobileBackground: false,
    isFullWidth: false,
};

const LayoutContext = createContext({
    layout: DEFAULT_CONTEXT,
    // eslint-disable-next-line
    setLayoutContext: (_: ILayoutContext) => {},
});

export const LayoutContextProvider: FCWithChildren<unknown> = ({ children }) => {
    const [layoutContext, setLayoutContext] = useState(DEFAULT_CONTEXT);

    const value = useMemo(
        () => ({
            layout: layoutContext,
            setLayoutContext,
        }),
        [layoutContext, setLayoutContext],
    );

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export function useLayoutContext() {
    const context = useContext(LayoutContext);
    return context;
}

export function useLayout(context: ILayoutContext) {
    const { setLayoutContext } = useLayoutContext();

    const memoizedContext = useMemo(
        () => ({
            showMobileBackground: context.showMobileBackground,
            showNavButtons: context.showNavButtons,
            showSearch: context.showSearch,
            title: context.title,
            isFullWidth: !!context.isFullWidth,
            isFixedHeight: !!context.isFixedHeight,
        }),
        [
            context.showMobileBackground,
            context.isFullWidth,
            context.showNavButtons,
            context.showSearch,
            context.title,
            context.isFixedHeight,
        ],
    );

    useEffect(() => {
        setLayoutContext(memoizedContext);

        return () => {
            setLayoutContext(DEFAULT_CONTEXT);
        };
    }, [setLayoutContext, memoizedContext]);
}
