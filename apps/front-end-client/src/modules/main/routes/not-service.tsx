import { useMemo } from 'react';

import { ContextLink } from '../../shared/components/context-link/context-link';
import { FormattedMessage } from '../../shared/components/formatted-message/formatted-message';
import { ErrorLayout } from '../layouts/error/error';

export function NotService() {
    const values = useMemo(
        () => ({
            home: (message: React.ReactNode[]) => <ContextLink to={'/'}>{message}</ContextLink>,
        }),
        [],
    );
    const title = useMemo(
        () => (
            <FormattedMessage
                id={'error.not-service.title'}
                defaultMessage="Oops! Parece que nosso sistema esta momentaneamente fora do ar. Estamos trabalhando para resolver isso. Volte em breve!"
            />
        ),
        [],
    );

    return (
        <ErrorLayout title={title}>
            <p>
                <FormattedMessage
                    id={'error.not-service.message'}
                    defaultMessage="We're unable to find the page you requested. <home>Click here to return to the homepage</home>."
                    values={values}
                />
            </p>
        </ErrorLayout>
    );
}
