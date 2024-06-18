import { memo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import type { FCWithChildren } from '../shared/utils/component.interface';

import { AuthProvider } from './components/auth-provider/auth-provider';
import { LocaleProvider } from './components/locale-provider/locale-provider';
import { NotificationProvider } from './components/notification-provider/notification-provider';
import { AppRoutes } from './main.routes';
import { store } from './store/root.store';

import '@endeavour/ui-kit/dist/style.css';

export const Application: FCWithChildren<unknown> = memo(({ children }) => {
    return <>{children}</>;
});

// Entry point for the application
export const Main = memo(() => {
    // TODO: Haduken providers list needs to go... Flattern via a provider pipe component at some point.
    return (
        <HelmetProvider>
            <ReduxProvider store={store}>
                <BrowserRouter>
                    <AuthProvider>
                        <LocaleProvider>
                            <NotificationProvider>
                                <Application>
                                    <AppRoutes />
                                </Application>
                            </NotificationProvider>
                        </LocaleProvider>
                    </AuthProvider>
                </BrowserRouter>
            </ReduxProvider>
        </HelmetProvider>
    );
});
