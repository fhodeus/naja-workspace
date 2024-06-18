import React, { useMemo } from 'react';
import type { UseFormProps } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Box, Button, ButtonSize, ButtonVariant, Field, Gap, Input } from '@endeavour/ui-kit';
import type { InventoryResponse } from '@endeavour/verification-integration';

import { useGoBack } from '../../../shared/hooks/use-go-back';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './inventorie-form.module.scss';
import { registrationResolver, type IInventoryProfile } from './inventorie-form.schema';

const style = createStyleHelper(styles, 'inventorie-form');

export const InventorieForm = ({
    inventory,
    loading,
    onSubmit,
}: {
    inventory?: InventoryResponse;
    onSubmit: (data: IInventoryProfile) => void;
    loading: boolean;
}) => {
    const goBack = useGoBack();

    const useFormInitial: UseFormProps<IInventoryProfile> = useMemo(
        () => ({
            resolver: registrationResolver(),
            defaultValues: {
                id: inventory?.id ?? '',
                name: inventory?.name ?? '',
                lote: inventory?.lote ?? '',
                manufacturinData: inventory?.manufacturinData ?? '',
                expirationDate: inventory?.expirationDate ?? '',
                quantity: inventory?.quantity ?? 0,
                supplier: inventory?.supplier ?? '',
                purchasePrice: inventory?.purchasePrice ?? '',
                salePrice: inventory?.salePrice ?? '',
                storageLocation: inventory?.storageLocation ?? '',
                reorderPoint: inventory?.reorderPoint ?? 0,
                usageAndAdministrationNotes: inventory?.usageAndAdministrationNotes ?? '',
                substanceControlRecord: inventory?.substanceControlRecord ?? '',
                safetyInformation: inventory?.safetyInformation ?? '',
                additionalNotes: inventory?.additionalNotes ?? '',
            },
        }),
        [inventory],
    );
    const form = useForm<IInventoryProfile>(useFormInitial);

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Gap>
                <Box className={style('form-profile')}>
                    <Gap>
                        <Field
                            label={'Nome'}
                            hasError={!!errors.name}
                            message={errors.name?.message}
                        >
                            <Input {...register('name')} placeholder="Nome" />
                        </Field>
                        <Field
                            label={'Lote'}
                            hasError={!!errors.lote}
                            message={errors.lote?.message}
                        >
                            <Input {...register('lote')} />
                        </Field>
                        <Field
                            label={'Dados de Fabricação'}
                            hasError={!!errors.manufacturinData}
                            message={errors.manufacturinData?.message}
                        >
                            <Input {...register('manufacturinData')} />
                        </Field>
                        <Field
                            label={'Data de Validade'}
                            hasError={!!errors.expirationDate}
                            message={errors.expirationDate?.message}
                        >
                            <Input type="date" {...register('expirationDate')} />
                        </Field>
                        <Field
                            label={'Quantidade'}
                            hasError={!!errors.quantity}
                            message={errors.quantity?.message}
                        >
                            <Input
                                {...register('quantity', { setValueAs: (value) => Number(value) })}
                                type="number"
                                placeholder="Quantidade"
                            />
                        </Field>
                        <Field
                            label={'Fornecedor'}
                            hasError={!!errors.supplier}
                            message={errors.supplier?.message}
                        >
                            <Input {...register('supplier')} placeholder="" />
                        </Field>
                        <Field
                            label={'Preço de Compra'}
                            hasError={!!errors.purchasePrice}
                            message={errors.purchasePrice?.message}
                        >
                            <Input {...register('purchasePrice')} placeholder="" />
                        </Field>
                        <Field
                            label={'Preço de Venda'}
                            hasError={!!errors.salePrice}
                            message={errors.salePrice?.message}
                        >
                            <Input {...register('salePrice')} placeholder="" />
                        </Field>
                        <Field
                            label={'Local de armazenamento'}
                            hasError={!!errors.storageLocation}
                            message={errors.storageLocation?.message}
                        >
                            <Input {...register('storageLocation')} placeholder="" />
                        </Field>
                        <Field
                            label={'Ponto de Reordenação'}
                            hasError={!!errors.reorderPoint}
                            message={errors.reorderPoint?.message}
                        >
                            <Input
                                {...register('reorderPoint', {
                                    setValueAs: (value) => Number(value),
                                })}
                                placeholder=""
                                type="number"
                            />
                        </Field>
                        <Field
                            label={'Notas de uso e Administração'}
                            hasError={!!errors.usageAndAdministrationNotes}
                            message={errors.usageAndAdministrationNotes?.message}
                        >
                            <Input {...register('usageAndAdministrationNotes')} placeholder="" />
                        </Field>
                        <Field
                            label={'Registro de controle de substância'}
                            hasError={!!errors.substanceControlRecord}
                            message={errors.substanceControlRecord?.message}
                        >
                            <Input {...register('substanceControlRecord')} placeholder="" />
                        </Field>
                        <Field
                            label={'Informação de Segurança'}
                            hasError={!!errors.safetyInformation}
                            message={errors.safetyInformation?.message}
                        >
                            <Input {...register('safetyInformation')} placeholder="" />
                        </Field>
                        <Field
                            label={'Notas Adicionais'}
                            hasError={!!errors.additionalNotes}
                            message={errors.additionalNotes?.message}
                        >
                            <Input {...register('additionalNotes')} placeholder="" />
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
                        {!inventory ? 'CRIAR' : 'ATUALIZAR'}
                    </Button>
                </Gap>
            </Gap>
        </form>
    );
};
