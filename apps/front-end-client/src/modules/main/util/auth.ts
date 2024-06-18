import { User } from 'oidc-client-ts';

import { config } from '../../../config/config';

/**
 * Gets the latest up to date auth store.
 * @returns
 */
export function getUser() {
    const key = `oidc.user:${config.AUTH_ENDPOINT}realms/${config.KEYCLOAK_REALM}:${config.KEYCLOAK_CLIENT_ID}`;

    try {
        const oidcStorage = localStorage.getItem(key) ?? sessionStorage.getItem(key);
        if (!oidcStorage) {
            return;
        }

        return User.fromStorageString(oidcStorage);
    } catch {
        return;
    }
}
