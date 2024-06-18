import { memo, useCallback, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

import type { FCWithChildren } from '../../../shared/utils/component.interface';

export const NotificationProvider: FCWithChildren<unknown> = memo(({ children }) => {
    const auth = useAuth();

    const handleServiceWorker = useCallback(async () => {
        if ('serviceWorker' in navigator) {
            if (auth.isAuthenticated && auth.user) {
                const register = await navigator.serviceWorker.register('/sw.js');
                let subscription = await register.pushManager.getSubscription();

                if (!subscription) {
                    await register.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey:
                            'BO4mL0YRusbCXLOs38_NzgAAFsOAGY1PjSdtu3ZOgWC5Mhtf7yT4oJTs7Kw727aZaQcV_nx7-WzfyO1dGaSvEdQ',
                    });
                    subscription = await register.pushManager.getSubscription();
                }

                const res = await fetch('http://localhost:3001/api/notification/subscribe', {
                    method: 'POST',
                    body: JSON.stringify({ subscription }),
                    headers: {
                        'content-type': 'application/json',
                    },
                });

                if (res.ok) {
                    console.log('[Notification]', 'Subscription Success');
                }
            }
        }
    }, [auth.isAuthenticated, auth.user]);

    useEffect(() => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification');
        } else if (Notification.permission === 'granted') {
            handleServiceWorker();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    handleServiceWorker();
                }
            });
        }
    }, [handleServiceWorker]);

    return <> {children}</>;
});
