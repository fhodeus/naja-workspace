import { useCallback, useEffect, useState, useMemo } from 'react';
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
import type { VeterinarianResponse } from '@endeavour/verification-integration';

import { veterinarianService } from '../../../../service/veterinarian.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { ContextNavLink } from '../../../shared/components/context-nav-link/context-nav-link';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { VeterinarianListComponent } from '../../components/veterinarian-list/veterinarian-list';

import styles from './veterinarian-list.module.scss';

const style = createStyleHelper(styles, 'veterinarian-list');

export const VeterinarianList = () => {
    useDashboardHeader('Veterinários');

    const { register, handleSubmit } = useForm(
        useMemo(
            () => ({
                defaultValues: {
                    name: '',
                },
            }),
            [],
        ),
    );

    const [veterinarians, setVeterinarians] = useState<VeterinarianResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetch = useCallback(async (data?: { name?: string }) => {
        setLoading(true);
        const { content } = await veterinarianService.getVeterinarians({ params: data });
        setLoading(false);
        setVeterinarians(content);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return (
        <Gap className={style(undefined)}>
            <Gap direction="horizontal" className={style('page-title-container')}>
                <Title>Veterinários</Title>
                <ContextNavLink to={'/dashboard/veterinarian/create'}>
                    <Button size={ButtonSize.SMALL} variant={ButtonVariant.ACTION} hasIcon>
                        <MaterialSymbol name="add" />
                    </Button>
                </ContextNavLink>
            </Gap>
            <Divider />
            <form onSubmit={handleSubmit(fetch)}>
                <Box className={style('filter')}>
                    <Input {...register('name')} placeholder="Nome" />
                    <Button variant={ButtonVariant.ACTION} hasIcon>
                        <MaterialSymbol name="filter_alt" />
                    </Button>
                </Box>
            </form>
            {loading ? <Loader /> : <VeterinarianListComponent veterinarians={veterinarians} />}
        </Gap>
    );
};
