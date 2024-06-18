import { useCallback } from 'react';
import { useAuth } from 'react-oidc-context';

import { useAppDispatch } from '../../main/store/root.store';
import { authenticationStore } from '../store/authentication.store';

import { useFullLocation } from './use-full-location';

interface T {
    acrValues?: string;
    returnQueryParameters?: Record<string, string>;
    url?: string;
}

export function useSignIn() {
    const auth = useAuth();
    const dispatch = useAppDispatch();
    const fullLocation = useFullLocation();

    return useCallback(
        (params?: T) => {
            const url = new URL(fullLocation);
            const newParams = new URLSearchParams(url.search);

            if (params?.returnQueryParameters) {
                Object.entries(params.returnQueryParameters).forEach(([key, value]) => {
                    newParams.set(key, value);
                });
            }

            if ((window as unknown as { kcContext: unknown }).kcContext !== undefined) {
                dispatch(authenticationStore.actions.closeLogin({ onOpen: true }));
                return;
            }

            url.search = newParams.toString();
            const isPopup = !!params?.acrValues;
            const signupFunction = isPopup ? auth.signinPopup : auth.signinRedirect;

            return signupFunction.bind(auth)({
                redirect_uri: params?.url ? params.url : url.toString(),
                ...(params?.acrValues
                    ? {
                          extraQueryParams: { acr_values: params.acrValues },
                      }
                    : {}),
            });
        },
        [auth, dispatch, fullLocation],
    );
}
