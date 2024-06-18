import { useCallback, useEffect, useMemo } from 'react';

import { layoutStore, selectDashboardName } from '../../shared/store/layout.store';
import { useAppDispatch, useAppSelector } from '../store/root.store';

export function useDashboardHeader(header?: string): [string, (name: string) => void] {
    const dashboardName = useAppSelector(selectDashboardName);
    const dispatch = useAppDispatch();

    const setDashboardHeader = useCallback(
        (name: string) => {
            dispatch(layoutStore.actions.setDashboardHeader(name));
        },
        [dispatch],
    );

    useEffect(() => {
        if (header) {
            setDashboardHeader(header);

            return () => {
                setDashboardHeader('');
            };
        }
    }, [header, setDashboardHeader]);

    return useMemo(() => [dashboardName, setDashboardHeader], [dashboardName, setDashboardHeader]);
}
