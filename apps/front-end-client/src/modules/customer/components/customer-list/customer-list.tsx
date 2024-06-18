
import { Gap } from '@endeavour/ui-kit';
import type { UserResponse } from '@endeavour/verification-integration';

import { createStyleHelper } from '../../../shared/utils/class-names';
import { CustomerListItemComponent } from '../customer-list-item/customer-list-item';

import styles from './customer-list.module.scss';

const style = createStyleHelper(styles, 'customer-list');

export const CustomerListComponent = ({clientes}:{clientes: UserResponse[]}) => {

    
    return (
        <Gap className={style()}>
            {clientes.map((client, index) => (
                <CustomerListItemComponent key={index} client={client} />
            ))}
        </Gap>
    );
};
