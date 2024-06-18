import { memo, useCallback, useEffect } from 'react';
import { IntlProvider } from 'react-intl';

import {
    loadLocaleMessages,
    selectFullLocale,
    selectLanguage,
    selectMessages,
} from '../../../shared/store/locale.store';
import type { FCWithChildren } from '../../../shared/utils/component.interface';
import { isRightToLeft } from '../../../shared/utils/language';
import { useAppDispatch, useAppSelector } from '../../store/root.store';

export const LocaleProvider: FCWithChildren<unknown> = memo(({ children }) => {
    const fullLocale = useAppSelector(selectFullLocale);
    const language = useAppSelector(selectLanguage);
    const messages = useAppSelector(selectMessages);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const isRTL = isRightToLeft(language);
        document.body.dir = isRTL ? 'rtl' : 'ltr';
    }, [language]);

    useEffect(() => {
        dispatch(loadLocaleMessages(language));
    }, [language, dispatch]);

    const onError = useCallback((err: { code: string; message: string }) => {
        if (err.code === 'MISSING_TRANSLATION') {
            console.warn('Missing translation', err.message);
            return;
        }
        throw err;
    }, []);

    return (
        <IntlProvider
            messages={messages}
            locale={fullLocale}
            defaultLocale={language}
            onError={onError}
        >
            {children}
        </IntlProvider>
    );
});
