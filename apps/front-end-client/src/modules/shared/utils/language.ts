import { config } from '../../../config/config';

const RTL_LANGUAGES = [
    'ae' /* Avestan */,
    'ar' /* 'العربية', Arabic */,
    'arc' /* Aramaic */,
    'bcc' /* 'بلوچی مکرانی', Southern Balochi */,
    'bqi' /* 'بختياري', Bakthiari */,
    'ckb' /* 'Soranî / کوردی', Sorani */,
    'dv' /* Dhivehi */,
    'fa' /* 'فارسی', Persian */,
    'glk' /* 'گیلکی', Gilaki */,
    'he' /* 'עברית', Hebrew */,
    'ku' /* 'Kurdî / كوردی', Kurdish */,
    'mzn' /* 'مازِرونی', Mazanderani */,
    'nqo' /* N'Ko */,
    'pnb' /* 'پنجابی', Western Punjabi */,
    'ps' /* 'پښتو', Pashto, */,
    'sd' /* 'سنڌي', Sindhi */,
    'ug' /* 'Uyghurche / ئۇيغۇرچە', Uyghur */,
    'ur' /* 'اردو', Urdu */,
    'yi' /* 'ייִדיש', Yiddish */,
];

export function isRightToLeft(language: string) {
    return RTL_LANGUAGES.includes(language.toLocaleLowerCase());
}

export function getCanonicalLocale(locale: string): string | boolean {
    if (!/[a-z]{2,2}-[a-z]{2,2}/i.test(locale)) {
        return false;
    }

    try {
        const canonicalLocales = Intl.getCanonicalLocales(locale);

        if (canonicalLocales.length === 0) {
            return false;
        }

        return canonicalLocales[0];
    } catch {
        return false;
    }
}

export function parseLocale(localeString: string) {
    return new Intl.Locale(localeString);
}

export function isValidLocale(locale?: string): locale is string {
    if (typeof locale !== 'string') {
        return false;
    }

    if (getCanonicalLocale(locale) === false) {
        return false;
    }

    if (!config.AVAILABLE_LOCALES.includes(locale)) {
        return false;
    }

    return true;
}

export const getLocaleMessages = async (
    _locale: string,
): Promise<{ response: Record<string, string> }> => {
    const { default: messages } = (await import(`../../../lang/${_locale}.json`)) as {
        default: Record<string, string >;
    };
    
    return { response: messages };
};
