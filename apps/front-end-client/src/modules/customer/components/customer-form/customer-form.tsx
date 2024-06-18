import React, { useMemo } from 'react';
import type { UseFormProps } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Box, Button, ButtonSize, ButtonVariant, Field, Gap, Input } from '@endeavour/ui-kit';
import type { UserResponse } from '@endeavour/verification-integration';

import { useGoBack } from '../../../shared/hooks/use-go-back';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './customer-form.module.scss';
import { registrationResolver, type ICustomerProfile } from './customer-form.schema';

const style = createStyleHelper(styles, 'customer-form');

export const CustomerForm = ({
    customer,
    onSubmit,
    loading,
}: {
    customer?: UserResponse;
    onSubmit: (data: ICustomerProfile) => void;
    loading: boolean;
}) => {
    const goBack = useGoBack();

    const useFormInitial: UseFormProps<ICustomerProfile> = useMemo(
        () => ({
            resolver: registrationResolver(),
            defaultValues: {
                fullName: customer?.fullName ?? '',
                email: customer?.email ?? '',
                address: customer?.address ?? '',
                telephone: customer?.telephone ?? '',
                dob: customer?.bod ?? '',
                profession: customer?.profession ?? '',
                medicalHistory: customer?.medicalHistory ?? '',
                id: customer?.id ?? '',
                document: customer?.document ?? '',
            },
        }),
        [customer],
    );
    const form = useForm<ICustomerProfile>(useFormInitial);

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Gap>
                <Box className={style('form-profile')}>
                    <Gap>
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
                            label={'Documento (CPF)'}
                            hasError={!!errors.document}
                            message={errors.document?.message}
                        >
                            <Input {...register('document')} placeholder="CPF" />
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
                            label={'Profissão'}
                            hasError={!!errors.profession}
                            message={errors.profession?.message}
                        >
                            <Input {...register('profession')} placeholder="" />
                        </Field>
                        <Field
                            label={'Histórico médico'}
                            hasError={!!errors.medicalHistory}
                            message={errors.medicalHistory?.message}
                        >
                            <Input {...register('medicalHistory')} placeholder="" />
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
                        {!customer ? 'CRIAR' : 'ATUALIZAR'}
                    </Button>
                </Gap>
            </Gap>
        </form>
    );
};
