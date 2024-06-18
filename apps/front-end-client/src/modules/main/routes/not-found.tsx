import { useMemo } from 'react';

import { ContextLink } from '../../shared/components/context-link/context-link';
import { FormattedMessage } from '../../shared/components/formatted-message/formatted-message';
import { ErrorLayout } from '../layouts/error/error';

export function NotFound() {
    const values = useMemo(
        () => ({
            home: (message: React.ReactNode[]) => <ContextLink to={'/'}>{message}</ContextLink>,
        }),
        [],
    );
    const title = useMemo(
        () => <FormattedMessage id={'error.not-found.title'} defaultMessage="404 Not Found" />,
        [],
    );
    
    return (
        <ErrorLayout title={title}>
            <p>
                <FormattedMessage
                    id={'error.not-found.message'}
                    defaultMessage="We're unable to find the page you requested. <home>Click here to return to the homepage</home>."
                    values={values}
                />
            </p>
        </ErrorLayout>
    );
}
