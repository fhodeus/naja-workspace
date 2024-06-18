import { useLocation } from 'react-router-dom';

export function useFullHost() {
    const { protocol, hostname, port } = window.location;

    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
}

export function useFullPath() {
    const { pathname, search } = useLocation();
    return `${pathname}${search ? `?${search}` : ''}`;
}

export function useFullLocation() {
    const path = useFullPath();
    const host = useFullHost();

    return `${host}${path}`;
}
