import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectFullLocale } from '../store/locale.store';

export function useHref(link: string): string;
export function useHref(link: undefined): undefined;
export function useHref(link: string | undefined): string | undefined {
    const buildHref = useHrefBuilder();

    if (link === undefined) {
        return undefined;
    }

    return buildHref(link);
}

export function useHrefBuilder() {
    const locale = useSelector(selectFullLocale);

    return useMemo(
        () => (link: string) => {
            if (link.startsWith('/')) {
                link = link.substring(1);
            }

            return `/${locale}/${link}`;
        },
        [locale],
    );
}
