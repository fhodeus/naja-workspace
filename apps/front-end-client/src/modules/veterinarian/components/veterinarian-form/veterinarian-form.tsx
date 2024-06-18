import React, { useMemo } from 'react';
import type { UseFormProps } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import {
    Box,
    Button,
    ButtonSize,
    ButtonVariant,
    ContentId,
    Divider,
    Field,
    Gap,
    Input,
} from '@endeavour/ui-kit';
import type { VeterinarianResponse } from '@endeavour/verification-integration';

import { useGoBack } from '../../../shared/hooks/use-go-back';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './veterinarian-form.module.scss';
import { registrationResolver, type IVeterinarianProfile } from './veterinarian-form.schema';

const style = createStyleHelper(styles, 'veterinarian-form');

export const VeterinarianForm = ({
    veterinarian,
    onSubmit,
    loading,
}: {
    veterinarian?: VeterinarianResponse;
    onSubmit: (data: IVeterinarianProfile) => void;
    loading: boolean;
}) => {
    const goBack = useGoBack();

    const useFormInitial: UseFormProps<IVeterinarianProfile> = useMemo(
        () => ({
            resolver: registrationResolver(),
            defaultValues: {
                fullName: veterinarian?.fullName ?? '',
                email: veterinarian?.email ?? '',
                address: veterinarian?.address ?? '',
                telephone: veterinarian?.telephone ?? '',
                dob: veterinarian?.bod ?? '',
                medicalHistory: veterinarian?.medicalHistory ?? '',
                id: veterinarian?.id ?? '',
                professionalRecord: veterinarian?.professionalRecord ?? '',
                specialization: veterinarian?.specialization ?? '',
            },
        }),
        [veterinarian],
    );
    const form = useForm<IVeterinarianProfile>(useFormInitial);

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Gap>
                <Box className={style('form-profile')}>
                    <Gap>
                        <div>
                            <div className={style('client-name')}>Veterinário</div>
                            {veterinarian?.id ? <ContentId>{veterinarian.id}</ContentId> : null}
                        </div>
                        <Divider />
                        <Field
                            label={'Nome'}
                            hasError={!!errors.fullName}
                            message={errors.fullName?.message}
                        >
                            <Input {...register('fullName')} placeholder="Nome Completo" />
                        </Field>
                        <Field
                            label={'Email'}
                            hasError={!!errors.email}
                            message={errors.email?.message}
                        >
                            <Input {...register('email')} placeholder="Email" />
                        </Field>
                        <Field
                            label={'Endereço'}
                            hasError={!!errors.address}
                            message={errors.address?.message}
                        >
                            <Input {...register('address')} placeholder="Endereço" />
                        </Field>
                        <Field
                            label={'Telefone'}
                            hasError={!!errors.telephone}
                            message={errors.telephone?.message}
                        >
                            <Input {...register('telephone')} placeholder="XX XXXX XXXX" />
                        </Field>
                        <Field
                            label={'Data de Nascimento'}
                            hasError={!!errors.dob}
                            message={errors.dob?.message}
                        >
                            <Input type="date" {...register('dob')} placeholder="XX / XX / XXXX" />
                        </Field>
                        <Field
                            label={'Especialização'}
                            hasError={!!errors.specialization}
                            message={errors.specialization?.message}
                        >
                            <Input {...register('specialization')} placeholder="" />
                        </Field>
                        <Field
                            label={'Histórico médico'}
                            hasError={!!errors.medicalHistory}
                            message={errors.medicalHistory?.message}
                        >
                            <Input {...register('medicalHistory')} placeholder="" />
                        </Field>
                        <Field
                            label={'Registro Profissional'}
                            hasError={!!errors.professionalRecord}
                            message={errors.professionalRecord?.message}
                        >
                            <Input {...register('professionalRecord')} placeholder="" />
                        </Field>
                    </Gap>
                </Box>
                <Gap direction="horizontal" className={style('button-container')}>
                    <Button size={ButtonSize.LARGE} onClick={goBack}>
                        CANCEL
                    </Button>
                    <Button
                        size={ButtonSize.LARGE}
                        variant={ButtonVariant.SUCCESS}
                        type="submit"
                        loading={loading}
                    >
                        {!veterinarian ? 'CRIAR' : 'ATUALIZAR'}
                    </Button>
                </Gap>
            </Gap>
        </form>
    );
};
