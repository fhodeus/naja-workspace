import type { Path } from 'react-router-dom';

export function pathToUrl(path: Partial<Path> | string) {
    if (typeof path === 'string') {
        return path;
    }

    const { pathname = '', search = '', hash = '' } = path;

    return `${pathname}${search}${hash}`;
}
