import React, { useCallback, useMemo, memo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import type { UseFormProps } from 'react-hook-form';

import {
    Box,
    Button,
    ButtonVariant,
    Field,
    Gap,
    MaterialSymbol,
    Input,
    ButtonSize,
    Select,
    TextArea,
} from '@endeavour/ui-kit';
import type { ConsultationResponse, InventoryResponse } from '@endeavour/verification-integration';
import type { DoseInventory } from '@endeavour/verification-integration/src/models/dose-inventory.interface';

import { PetInfo } from '../../../customer/components/pet-info/pet-info';
import { useGoBack } from '../../../shared/hooks/use-go-back';
import { createClassName, createStyleHelper } from '../../../shared/utils/class-names';
import { VeterinarianListItem } from '../../../veterinarian/components/veterinarian-list-item/veterinarian-list-item';
import {
    registrationResolver,
    type IConsultationSchema,
} from '../consultation-form/consultation.schema';

import styles from './scheduling-form.module.scss';

const style = createStyleHelper(styles, 'scheduling-form');

interface IConstultationForm {
    className?: string;
    consultation: ConsultationResponse;
    inventory: InventoryResponse[];
    onSubmit: (data: IConsultationSchema) => void;
    loading?: boolean;
}

export function SchedulingForm({
    className,
    onSubmit,
    consultation,
    inventory,
    loading,
}: IConstultationForm) {
    const goBack = useGoBack();

    const useFormInitial: UseFormProps<IConsultationSchema> = useMemo(
        () => ({
            resolver: registrationResolver(),
            defaultValues: {
                petId: consultation.petId,
                veterinarianId: consultation.veterinarianId,
                id: consultation.id,
                day: consultation.day,
                startTime: consultation.startTime,
                endTime: consultation.endTime,
                doseInventory: consultation.doseInventory,
                status: consultation.status,
                reason: consultation.reason,
                scheduleType: consultation.scheduleType,
                anamneseContactants: consultation.anamneseContactants,
                anamneseFood: consultation.anamneseFood,
                anamnesePrincipal: consultation.anamnesePrincipal,
                anamneseProgress: consultation.anamneseProgress,
                anamneseSpecial: consultation.anamneseSpecial,
            },
        }),
        [consultation],
    );

    const form = useForm<IConsultationSchema>(useFormInitial);
    const { register, handleSubmit, watch, formState, control } = form;
    const { errors } = formState;

    const fieldsValue = watch('doseInventory');

    const { append, remove, fields } = useFieldArray(
        useMemo(() => ({ control, name: 'doseInventory' }), [control]),
    );

    const appendFieldArray = useCallback(() => {
        append({ id: '', lote: '' });
    }, [append]);

    const doses = inventory.reduce(
        (acc, cur) => [...acc, ...cur.doseInventory],
        [] as DoseInventory[],
    );

    const dosesInField: string[] = fieldsValue.reduce((acc, cur) => {
        return [...acc, cur.id];
    }, [] as string[]);

    const dosesFiltred = doses.filter((e) => {
        return !(dosesInField.indexOf(e.id) > -1);
    });

    console.log(fieldsValue, errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Gap className={createClassName([className, style(undefined)])}>
                <VeterinarianListItem veterinarian={consultation.veterinarian} />
                <Box>
                    <Gap>
                        <Gap className={style('scheduling-header')}>
                            <div>
                                <p className={style('title-section')}>Horário do agendamento </p>
                            </div>
                        </Gap>
                        <Gap className={style('date-hour-form')}>
                            <Field
                                label={'Dia'}
                                hasError={!!errors.day}
                                message={errors.day?.message}
                            >
                                <Input {...register('day')} type="date" />
                            </Field>
                            <Field
                                label={'Hora'}
                                hasError={!!errors.startTime}
                                message={errors.startTime?.message}
                            >
                                <Input {...register('startTime')} type="time" />
                            </Field>
                            <Field
                                label={'Até'}
                                hasError={!!errors.endTime}
                                message={errors.endTime?.message}
                            >
                                <Input {...register('endTime')} type="time" />
                            </Field>
                        </Gap>
                    </Gap>
                </Box>
                <Box>
                    <PetInfo pet={consultation.pet} customerId={consultation.pet.userId} />
                </Box>
                <Box>
                    <Gap>
                        <Field
                            label={'Status de Agendamento'}
                            hasError={!!errors.status}
                            message={errors.status?.message}
                        >
                            <Select
                                // eslint-disable-next-line @arthurgeron/react-usememo/require-usememo
                                options={[
                                    { label: 'Agendado', value: 'agendado' },
                                    { label: 'Em Consulta', value: 'em-consulta' },
                                    { label: 'Aguardando Exames', value: 'aguardando-exames' },
                                    { label: 'Encerrado', value: 'encerrado' },
                                ]}
                                {...register('status')}
                            />
                        </Field>
                        <Field
                            label={'Tipo de Agendamento'}
                            hasError={!!errors.scheduleType}
                            message={errors.scheduleType?.message}
                        >
                            <Select
                                // eslint-disable-next-line @arthurgeron/react-usememo/require-usememo
                                options={[
                                    { label: 'Exame', value: 'exame' },
                                    { label: 'Consulta', value: 'consulta' },
                                    { label: 'Vacinação', value: 'vacina' },
                                ]}
                                {...register('scheduleType')}
                            />
                        </Field>

                        <Field
                            label={'Resumo sobre o Agendamento'}
                            hasError={!!errors.reason}
                            message={errors.reason?.message}
                        >
                            <TextArea {...register('reason')} />
                        </Field>
                        <div>
                            <p className={style('title-section')}>Anamnese</p>
                        </div>
                        <Gap>
                            <Field
                                label={'Queixa principal (evolução, tratamento, resultados)'}
                                hasError={!!errors.anamnesePrincipal}
                                message={errors.anamnesePrincipal?.message}
                            >
                                <TextArea {...register('anamnesePrincipal')} className={''} />
                            </Field>
                            <Field
                                label={'Histórico Médico Progressos'}
                                hasError={!!errors.anamneseProgress}
                                message={errors.anamneseProgress?.message}
                            >
                                <Input {...register('anamneseProgress')} type="text" />
                            </Field>
                            <Field
                                label={'Alimentação'}
                                hasError={!!errors.anamneseFood}
                                message={errors.anamneseFood?.message}
                            >
                                <Input {...register('anamneseFood')} type="text" />
                            </Field>
                            <Field
                                label={'Contactantes'}
                                hasError={!!errors.anamneseContactants}
                                message={errors.anamneseContactants?.message}
                            >
                                <Input {...register('anamneseContactants')} type="text" />
                            </Field>
                        </Gap>
                    </Gap>
                </Box>

                <Box>
                    <Gap>
                        <div>
                            <p className={style('title-section')}>Anamnese Especial</p>
                        </div>
                        <Gap>
                            <Field
                                hasError={!!errors.anamneseSpecial}
                                message={errors.anamneseSpecial?.message}
                            >
                                <TextArea {...register('anamneseSpecial')} className={''} />
                            </Field>
                        </Gap>
                    </Gap>
                </Box>
                <Box>
                    <Gap>
                        <Gap className={style('scheduling-header')}>
                            <div>
                                <p className={style('title-section')}>Medicamento / Vacina</p>
                            </div>
                            <div>
                                <Button
                                    hasIcon
                                    variant={ButtonVariant.ACTION}
                                    onClick={appendFieldArray}
                                >
                                    <MaterialSymbol name="add" />
                                </Button>
                            </div>
                        </Gap>
                        <Gap>
                            {fields.map((field, index) => (
                                <div className={style('field-array')} key={field.id}>
                                    <Field
                                        label={'Medicamento / Vacina'}
                                        hasError={!!errors.doseInventory?.[index]?.id}
                                        message={errors.doseInventory?.[index]?.message}
                                    >
                                        {field.consultationId ? (
                                            <Input value={field.name} disabled />
                                        ) : (
                                            <Select
                                                options={dosesFiltred.map((e) => ({
                                                    value: e.id,
                                                    label: e.name,
                                                }))}
                                                {...register(`doseInventory.${index}.id`)}
                                            />
                                        )}
                                    </Field>
                                    <Field
                                        label={'Lote / Identificação'}
                                        hasError={!!errors.doseInventory?.[index]?.lote}
                                        message={errors.doseInventory?.[index]?.message}
                                    >
                                        <Input {...register(`doseInventory.${index}.lote`)} />
                                    </Field>
                                    <div>
                                        <ButtonAppendFieldArray
                                            disabled={!!field.consultationId}
                                            index={index}
                                            onClick={remove}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Gap>
                    </Gap>
                </Box>

                <Gap direction="horizontal" className={style('button-container')}>
                    <Button size={ButtonSize.LARGE} onClick={goBack}>
                        CANCELAR
                    </Button>
                    <Button
                        type="submit"
                        variant={ButtonVariant.SUCCESS}
                        size={ButtonSize.LARGE}
                        loading={loading}
                    >
                        SALVAR E CONTINUAR
                    </Button>
                </Gap>
            </Gap>
        </form>
    );
}

const ButtonAppendFieldArray: React.FC<{
    index: number;
    onClick: (i: number) => void;
    disabled: boolean;
}> = memo(({ index, onClick, disabled }) => {
    const onClickCallback = useCallback(() => {
        onClick(index);
    }, [index, onClick]);

    return (
        <Button
            disabled={disabled}
            className={style('field-array-delete', { 'not-disabled': !disabled })}
            hasIcon
            onClick={onClickCallback}
        >
            <MaterialSymbol name="delete" />
        </Button>
    );
});
