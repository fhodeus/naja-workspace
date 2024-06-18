import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { customerService } from '../../../../service/customer.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { Await } from '../../../shared/utils/loader';
import { CustomerPageComponent } from '../../components/customer-page/customer-page';

import styles from './customer.module.scss';

const style = createStyleHelper(styles, 'customer-container');

export const CustomerContainer = () => {
    const params = useParams();
    const loader = { response: customerService.getCustomer(params.id ?? '') };

    useDashboardHeader('Perfil do Usuário');

    const fallback = useMemo(() => <Loader message="carregando" />, []);

    return (
        <div className={style()}>
            <Suspense fallback={fallback}>
                <Await resolve={loader.response}>
                    {({ content }) => <CustomerPageComponent customer={content} />}
                </Await>
            </Suspense>
        </div>
    );
};
