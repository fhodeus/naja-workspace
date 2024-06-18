import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

import { ContextNavigate } from '../../shared/components/context-navigate/context-navigate';
import type { FCWithChildren } from '../../shared/utils/component.interface';
import { Authenticate } from '../routes/authenticate';
import { Logout } from '../routes/logout';

export enum AuthType {
    REQUIRE_AUTHENTICATED,
    REQUIRE_UNAUTHENTICATED,
}

export interface IAuthenticationGuardProps {
    type?: AuthType;
}

export const AuthenticationGuard: FCWithChildren<IAuthenticationGuardProps> = ({
    type = AuthType.REQUIRE_AUTHENTICATED,
    children,
}) => {
    const auth = useAuth();

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated && auth.user) {
            try {
                auth.signinSilent();
            } catch (e) {
                console.log(e);
            }
        }
    }, [auth]);

    const authRequired = !auth.isAuthenticated && type === AuthType.REQUIRE_AUTHENTICATED;
    const deauthRequired = auth.isAuthenticated && type === AuthType.REQUIRE_UNAUTHENTICATED;
    const tokenIsNotActive =  !auth.isAuthenticated && auth.user;

    // While we load if we have a token we can just show the page. It might not fully load so we'll redirect after.
    if (auth.isAuthenticated && auth.isLoading && authRequired) {
        return <>{children}</>;
    }

    // Hide the page while we load if we don't have cached auth
    if (auth.isLoading) {
        return null;
    }

    if (tokenIsNotActive) {
        return <Logout />;
    }

    if (authRequired) {
        return <Authenticate />;
    }

    if (deauthRequired) {
        return <ContextNavigate to="/dashboard" />;
    }

    return <>{children}</>;
};
