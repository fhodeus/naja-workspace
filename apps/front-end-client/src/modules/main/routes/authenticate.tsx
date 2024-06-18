import React, { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

import { ContextNavigate } from '../../shared/components/context-navigate/context-navigate';
import { useSignIn } from '../../shared/hooks/use-sign-in';

export function Authenticate() {
    const signIn = useSignIn();
    const auth = useAuth();

    const { protocol, hostname, port, pathname } = window.location;
    const redirectUri = `${protocol}//${hostname}${port ? `:${port}` : ''}${pathname}`;

    useEffect(() => {
        if (!auth.isAuthenticated && !auth.user) signIn({ url: redirectUri });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, redirectUri]);

    if (!auth.isAuthenticated && !auth.user) return <></>;

    return <ContextNavigate to="/" />;
}
