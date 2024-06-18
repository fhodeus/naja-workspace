import { useEffect, useState } from 'react';

import { ServiceTypeStatus } from '../../main/guards/service-guard';

export interface ServiceStatusLoading {
    loading: true;
}

export interface ServiceStatusCompleted {
    loading: false;
    status: ServiceTypeStatus;
}

export const useServiceOnline = (service: () => Promise<unknown>) => {
    const [serviceStatus, setServiceStatus] = useState<
        ServiceStatusLoading | ServiceStatusCompleted
    >({ loading: true });

    useEffect(() => {
        service()
            .then(() => {
                setServiceStatus({ loading: false, status: ServiceTypeStatus.SERVICE_ONLINE });
            })
            .catch(() => {
                setServiceStatus({ loading: false, status: ServiceTypeStatus.SERVICE_OFFLINE });
            });
    }, [service]);

    return serviceStatus;
};
