import { FormattedNumber } from 'react-intl';

import type { FCWithChildren } from '../../utils/component.interface';

/**
 * This component exists to allow for i18n translations to display formatted currencies and
 * not as a general use component in the application.
 *
 * Usage: <Currency>GBP 12</Currency> -> £12
 */
export const Currency: FCWithChildren<unknown> = ({ children }) => {
    if (!Array.isArray(children) || typeof children[0] !== 'string') {
        return <>{children}</>;
    }

    const [currencyCode, value] = children[0].split(' ');

    if (!currencyCode || !value) {
        // Just output the input.
        return <>{children}</>;
    }

    return (
        <FormattedNumber currency={currencyCode.trim()} value={+value.trim()} style={'currency'} />
    );
};
