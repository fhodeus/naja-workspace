import { useCallback, useMemo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    Box,
    Button,
    Divider,
    Input,
    Gap,
    ButtonSize,
    ButtonVariant,
    MaterialSymbol,
    Title,
} from '@endeavour/ui-kit';
import type { UserResponse } from '@endeavour/verification-integration';

import { customerService } from '../../../../service/customer.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { useGuardRole } from '../../../main/hooks/use-guard-role';
import { ContextLink } from '../../../shared/components/context-link/context-link';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { CustomerListComponent } from '../../components/customer-list/customer-list';

import styles from './customer-list.module.scss';

const style = createStyleHelper(styles, 'customer-list-container');

export const CustomerListContainer = () => {
    const [clientes, setClientes] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetch = useCallback(async (params?: { name?: string; document?: string }) => {
        setLoading(true);

        const { content } = await customerService.getAllCustomers({ params });
        setLoading(false);

        setClientes(content);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const { register, handleSubmit } = useForm(
        useMemo(
            () => ({
                defaultValues: {
                    name: '',
                    document: '',
                },
            }),
            [],
        ),
    );

    const isEditable = useGuardRole('admin');

    useDashboardHeader('Lista de Usuários');

    return (
        <Gap className={style(undefined)}>
            <Gap direction="horizontal" className={style('page-title-container')}>
                <Title>Clientes</Title>
                {isEditable ? (
                    <ContextLink to={'/dashboard/customer/create'}>
                        <Button size={ButtonSize.SMALL} variant={ButtonVariant.ACTION} hasIcon>
                            <MaterialSymbol name="add" />
                        </Button>
                    </ContextLink>
                ) : null}
            </Gap>
            <Divider />
            <form onSubmit={handleSubmit(fetch)}>
                <Box className={style('filter')}>
                    <Input {...register('name')} placeholder="Nome" />
                    <Input {...register('document')} placeholder="Documento" />
                    <Button type="submit" variant={ButtonVariant.ACTION} hasIcon>
                        <MaterialSymbol name="filter_alt" />
                    </Button>
                </Box>
            </form>
            {loading ? (
                <Loader message="Carregando" />
            ) : (
                <CustomerListComponent clientes={clientes} />
            )}
        </Gap>
    );
};
