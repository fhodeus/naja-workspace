export function useKeycloakContext() {
    const isKeycloakContext = (window as unknown as { kcContext: unknown }).kcContext !== undefined;
    return isKeycloakContext;
}
