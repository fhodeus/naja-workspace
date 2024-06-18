import { Fragment } from 'react';
import { useAuth } from 'react-oidc-context';

import type { FCWithChildren } from '@endeavour/ui-kit/dist/utils/component.interface';

interface IRoleGuardProps {
    roles: string[];
}

export const RolesGuard: FCWithChildren<IRoleGuardProps> = ({ roles = [], children }) => {
    const auth = useAuth();

    const groups = (auth.user?.profile.groups as string[]) ?? [];

    const roleFinded = groups.find((e) => roles.includes(e));

    if (roleFinded) {
        return <>{children}</>;
    }

    return <Fragment />;
};
