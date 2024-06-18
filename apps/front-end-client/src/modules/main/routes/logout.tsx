import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useSearchParams } from 'react-router-dom';

import { useContextNavigate } from '../../shared/hooks/use-context-navigate';
import { useFullHost } from '../../shared/hooks/use-full-location';

export const Logout = () => {
    const auth = useAuth();
    const host = useFullHost();
    const [params] = useSearchParams();
    const navigate = useContextNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated && !auth.user) {
            return navigate('/login');
        }
        
        const backTo = params.get('backTo');
        console.log('[Logout]', 'Signing out');
        auth.signoutRedirect({
            redirectMethod: 'replace',
            post_logout_redirect_uri: backTo ? `${host}${backTo}` : host,
            id_token_hint: auth.user?.id_token,
        });
    }, [auth, params, host, navigate]);

    return <></>;
};
