import { useCallback, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { AuthProvider } from '../modules/main/components/auth-provider/auth-provider';
import { store } from '../modules/main/store/root.store';
import type { FCWithChildren } from '../modules/shared/utils/component.interface';

// eslint-disable-next-line @typescript-eslint/ban-types
const AllProviders: FCWithChildren<{}> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <BrowserRouter>
                <IntlProvider
                    messages={useMemo(() => ({}), [])}
                    locale={'en-GB'}
                    defaultLocale="en"
                    onError={useCallback((err?: { code: string }) => {
                        if (err && err.code === 'MISSING_TRANSLATION') {
                            return;
                        }

                        throw err;
                    }, [])}
                >
                    <AuthProvider>{children}</AuthProvider>
                </IntlProvider>
            </BrowserRouter>
        </ReduxProvider>
    );
};

type RenderParams = Parameters<typeof render>;

const customRender = (ui: RenderParams[0], options?: RenderParams[1]): ReturnType<typeof render> =>
    render(ui, { wrapper: AllProviders, ...options });

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react';

// override render method
// eslint-disable-next-line import/export
export { customRender as render };
