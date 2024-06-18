import { memo } from 'react';
import { useRoutes } from 'react-router-dom';

import { dashBoardRoutes } from '../dashboard/dashboard.routes';

import { LocaleRedirect } from './components/locale-redirect/locale-redirect';
import { AuthenticationGuard, AuthType } from './guards/authentication-guard';
import { ServiceGuard } from './guards/service-guard';
import { MainAuthenticated } from './layouts/main-authenticated/main-authenticated';
import { Authenticate } from './routes/authenticate';
import { Logout } from './routes/logout';
import { NotFound } from './routes/not-found';
import { NotService } from './routes/not-service';
import { Guard } from './util/guard';

const UNAUTHENTICATED_GUARDS_PROPS = [
    <AuthenticationGuard type={AuthType.REQUIRE_UNAUTHENTICATED} key={'auth'} />,
    <ServiceGuard key={'service'} redirect="not-service" />,
];

const AUTHENTICATED_GUARDS_PROPS = [
    <AuthenticationGuard type={AuthType.REQUIRE_AUTHENTICATED} key={'auth'} />,
    <ServiceGuard key={'service'} redirect="not-service" />,
];

const routes = [
    { index: true, element: <LocaleRedirect /> },
    {
        path: '404',
        element: <NotFound />,
    },
    {
        path: '/:locale',
        element: <LocaleRedirect />,
        children: [
            {
                path: 'not-service',
                element: <NotService />,
            },
            {
                path: 'login',
                element: (
                    <Guard guards={UNAUTHENTICATED_GUARDS_PROPS}>
                        <Authenticate />
                    </Guard>
                ),
            },
            {
                path: 'logout',
                element: <Logout />,
            },
            {
                element: (
                    <Guard guards={AUTHENTICATED_GUARDS_PROPS}>
                        <MainAuthenticated />{' '}
                    </Guard>
                ),
                children: dashBoardRoutes,
            },
        ]
    },
    {
        path: '*',
        element: <LocaleRedirect />,
        children: [
            {
                index: true,
                path: '*',
                element: <div>{'/404'}</div>,
            },
        ],
    },
];

export const AppRoutes = memo(() => {
    const appRoutes = useRoutes(routes);

    return appRoutes;
});
