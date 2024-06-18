import { userCountryList } from './countries';

/**
 * Converts the specified string to a slug value
 * @param text text to convert
 */
export function slugify(text: string | undefined) {
    if (!text) {
        return '';
    }

    return text
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .replace(/[^a-z0-9\u0430-\u044f]+/g, '-')
        .replace(/^(?:-+)|(?:-+)$/g, '');
}

/**
 * Converts the first char of sentence into capital
 * @param sentence text to convert
 */
export function capitalize(sentence: string): string {
    const value = sentence.trim();
    return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Converts the first char of sentence into lower case
 * @param sentence text to convert
 */
export function unCapitalize(sentence: string): string {
    const value = sentence.trim();
    return value.charAt(0).toLocaleLowerCase() + value.slice(1);
}

/**
 * Converts the country code passed as parameter to full country name to be displayed
 * @param countryCode text to convert
 */
export function convertCountryCodeToFullName(countryCode: string): string {
    if (!countryCode) {
        return countryCode;
    }

    const country = userCountryList.find((item) => item.value === countryCode.toUpperCase());
    return country?.name ? country.name : countryCode;
}

/**
 * Converts the first character of each word in the sentence to uppercase
 * @param sentence text to convert
 */
export function capitalizeSentence(sentence: string): string {
    const sentenceWords = sentence.split(' ').filter((e) => !!e);

    for (let i = 0; i < sentenceWords.length; i++) {
        sentenceWords[i] =
            sentenceWords[i][0].toUpperCase() + sentenceWords[i].slice(1).toLocaleLowerCase();
    }

    return sentenceWords.join(' ');
}
