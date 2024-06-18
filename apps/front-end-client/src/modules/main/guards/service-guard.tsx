import { useCallback } from 'react';

import { config } from '../../../config/config';
import { httpClient } from '../../../service/gateway/axios.adapter';
import { ContextNavigate } from '../../shared/components/context-navigate/context-navigate';
import { useServiceOnline } from '../../shared/hooks/use-service-online';
import type { FCWithChildren } from '../../shared/utils/component.interface';

export enum ServiceTypeStatus {
    SERVICE_ONLINE,
    SERVICE_OFFLINE,
}

export interface IServiceGuardProps {
    type?: ServiceTypeStatus;
    redirect?: string;
}

export const ServiceGuard: FCWithChildren<IServiceGuardProps> = ({
    type = ServiceTypeStatus.SERVICE_ONLINE,
    children,
    redirect,
}) => {
    const service = useServiceOnline(
        useCallback(() => httpClient.get(config.API_ENDPOINT + '/api'), []),
    );

    if (service.loading) {
        return <>{children}</>;
    }

    const serviceTypeMatch = service.status === type;

    if (serviceTypeMatch) {
        return <>{children}</>;
    }

    if (redirect) {
        return <ContextNavigate to={redirect} />;
    }

    if (!serviceTypeMatch) {
        return null;
    }

    return null;
};
