import { Suspense, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Divider, Gap, Title } from '@endeavour/ui-kit';

import { customerService } from '../../../../service/customer.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { useContextNavigate } from '../../../shared/hooks/use-context-navigate';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { Await } from '../../../shared/utils/loader';
import { CustomerForm } from '../../components/customer-form/customer-form';
import type { ICustomerProfile } from '../../components/customer-form/customer-form.schema';

import styles from './customer-profile.module.scss';

const style = createStyleHelper(styles, 'customer-profile-container');

export const CustomerProfileContainer = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const loader = { response: customerService.getCustomer(params.id ?? '') };

    const navigate = useContextNavigate();

    const postCustomer = async (payload: ICustomerProfile) => {
        setLoading(true);
        const config = { query: payload.id, payload: { ...payload, bod: payload.dob } };

        const send = !payload.id ? customerService.createCustomer : customerService.updateCustomer;

        const { content } = await send.bind(customerService, config)();

        navigate(`/dashboard/customer/profile/${content.id}`);
    };

    useDashboardHeader('Usuário');

    return (
        <Suspense
            fallback={useMemo(
                () => (
                    <Loader />
                ),
                [],
            )}
        >
            <Await resolve={loader.response}>
                {({ content }) => (
                    <Gap className={style(undefined)}>
                        <Title>{!content?.id ? 'Criando Novo Usuário' : 'Editando Usuário'}</Title>
                        <Divider />
                        <CustomerForm
                            customer={content}
                            onSubmit={postCustomer}
                            loading={loading}
                        />
                    </Gap>
                )}
            </Await>
        </Suspense>
    );
};
