import { useParams, Outlet } from 'react-router-dom';

import { ContextNavigate } from '../../../shared/components/context-navigate/context-navigate';

export const LocaleRedirect = () => {
    const { locale } = useParams();
    
    if (!locale) {
        return <ContextNavigate to="/dashboard" />;
    }

    return <Outlet />;
};
