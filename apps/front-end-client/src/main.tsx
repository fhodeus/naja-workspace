import React from 'react';

import { shouldPolyfill as shouldPolyfillCanonicalLocales } from '@formatjs/intl-getcanonicallocales/should-polyfill';
import { shouldPolyfill as shouldPolyfillLocale } from '@formatjs/intl-locale/should-polyfill';
import { shouldPolyfill as shouldPolyfillPlurals } from '@formatjs/intl-pluralrules/should-polyfill';
import { shouldPolyfill as shouldPolyfillRelativeTime } from '@formatjs/intl-relativetimeformat/should-polyfill';
import { createRoot } from 'react-dom/client';

import { config, loadConfig } from './config/config';

import '@endeavour/ui-kit/dist/style.css';

async function loadPluralPolyfills() {
    // TODO: Add locales support
    const locale = config.DEFAULT_LOCALE;
    if (!shouldPolyfillPlurals(locale)) {
        return;
    }

    // Load the polyfills
    await import('@formatjs/intl-pluralrules/polyfill');
    await import('@formatjs/intl-pluralrules/locale-data/en');
}

async function loadRelativeTimePolyfills() {
    // TODO: Add locales support
    const locale = config.DEFAULT_LOCALE;
    if (!shouldPolyfillRelativeTime(locale)) {
        return;
    }

    // Load the polyfills
    await import('@formatjs/intl-relativetimeformat/polyfill');
    await import('@formatjs/intl-relativetimeformat/locale-data/en');
}

async function loadLocalePolyfills() {
    if (!shouldPolyfillLocale()) {
        return;
    }

    await import('@formatjs/intl-locale/polyfill');
}

async function loadCanonicalLocalePolyfills() {
    if (!shouldPolyfillCanonicalLocales()) {
        return;
    }

    await import('@formatjs/intl-getcanonicallocales');
}

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
function renderSite(Main: typeof import('./modules/main/main').Main) {
    const container = document.getElementById('root');

    if (!container) {
        throw new Error('Could not boostrap application as container element is missing.');
    }

    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <Main />
        </React.StrictMode>,
    );
}

loadConfig()
    .then(() =>
        Promise.all([
            import('./modules/main/main'),
            loadPluralPolyfills(),
            loadRelativeTimePolyfills(),
            loadLocalePolyfills(),
            loadCanonicalLocalePolyfills(),
        ]),
    )
    .then(([mainModule]) => renderSite(mainModule.Main));
