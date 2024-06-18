import { type FunctionComponent, useMemo } from 'react';
import { FormattedMessage as IntlMessage } from 'react-intl';

import type { Props as IntlProps } from 'react-intl/src/components/message';

import { convertCountryCodeToFullName } from '../../utils/strings';
import { Currency } from '../currency/currency';

export const FormattedMessage: FunctionComponent<IntlProps> = ({ values, ...props }) => {
    const memoizedValues = useMemo(
        () =>
            ({
                ...(values ?? {}),
                br: () => <br />,
                ['format-currency']: (chunks) => <Currency>{chunks}</Currency>,
                ['country']: (country) => convertCountryCodeToFullName(country.join('').trim()),
            } as IntlProps['values']),
        [values],
    );

    return <IntlMessage {...props} values={memoizedValues} />;
};
