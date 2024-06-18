import React, { useCallback, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { UseFormProps } from 'react-hook-form';

import {
    Accordion,
    Box,
    Button,
    ButtonVariant,
    Divider,
    Field,
    Gap,
    Select,
    MaterialSymbol,
    Input,
    ButtonSize,
    TextArea,
} from '@endeavour/ui-kit';
import type {
    BaseConsultation,
    PetResponse,
    VeterinarianResponse,
} from '@endeavour/verification-integration';

import { PetInfo } from '../../../customer/components/pet-info/pet-info';
import type { SelectCalendar } from '../../../shared/components/calendar/calendar';
import { Calendar } from '../../../shared/components/calendar/calendar';
import { useGoBack } from '../../../shared/hooks/use-go-back';
import { createClassName, createStyleHelper } from '../../../shared/utils/class-names';
import {
    registrationResolver,
    type IConsultationSchema,
} from '../consultation-form/consultation.schema';

import styles from './consultation-form.module.scss';

const style = createStyleHelper(styles, 'consultation-form');

interface IConstultationForm {
    veterinarians: VeterinarianResponse[];
    pet: PetResponse;
    className?: string;
    consultations: BaseConsultation[];
    onSubmit: (data: IConsultationSchema) => Promise<void>;
    loading?: boolean;
}

export function ConsultationForm({
    veterinarians,
    className,
    onSubmit,
    pet,
    consultations,
    loading,
}: IConstultationForm) {
    const goBack = useGoBack();

    const useFormInitial: UseFormProps<IConsultationSchema> = useMemo(
        () => ({
            resolver: registrationResolver(),
            defaultValues: {
                petId: pet.id,
                veterinarianId: '',
                date: 'val',
                id: '',
                doseInventory: [],
                anamneseContactants: '',
                anamneseFood: '',
                anamnesePrincipal: '',
                anamneseProgress: '',
                anamneseSpecial: '',
            },
        }),
        [pet],
    );

    const [expandDate, setExpandDate] = useState(true);

    const { register, setValue, handleSubmit, formState } =
        useForm<IConsultationSchema>(useFormInitial);
    const { errors } = formState;

    const expandCalendar = useCallback(() => setExpandDate((e) => !e), []);

    const OnChangeDate = (e: SelectCalendar) => {
        const result1 = new Date(e.start).toISOString().split('T')[0];
        const result2 = new Date(e.start).toTimeString().split(' ')[0];
        const result3 = new Date(e.end).toTimeString().split(' ')[0];

        setValue('day', result1);
        setValue('startTime', result2);
        setValue('endTime', result3);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Gap className={createClassName([className, style(undefined)])}>
                <Box>
                    <Field
                        label={'Veterinário'}
                        hasError={!!errors.veterinarianId}
                        message={errors.veterinarianId?.message}
                    >
                        <Select
                            {...register('veterinarianId')}
                            options={veterinarians.map((veterinarian) => ({
                                ...veterinarian,
                                value: veterinarian.id,
                                label: veterinarian.fullName,
                            }))}
                        />
                    </Field>
                </Box>
                <Divider />
                <Box>
                    <Gap>
                        <Gap className={style('scheduling-header')}>
                            <div>
                                <p>Horário do agendamento </p>
                                <p>Selecione o horário de atendimento</p>{' '}
                            </div>
                            <div>
                                <Button
                                    hasIcon
                                    variant={ButtonVariant.ACTION}
                                    onClick={expandCalendar}
                                >
                                    <MaterialSymbol name="expand_more" />
                                </Button>{' '}
                            </div>
                        </Gap>
                        <Accordion isOpen={expandDate}>
                            <div>
                                <Calendar
                                    events={consultations.map((e) => ({
                                        title: e.id,
                                        start: new Date(e.day + 'T' + e.startTime),
                                        end: new Date(e.day + 'T' + e.endTime),
                                        extendedProps: { ...e },
                                    }))}
                                    onChange={OnChangeDate}
                                />
                            </div>
                        </Accordion>
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
                            hasError={!!errors.scheduleType}
                            message={errors.scheduleType?.message}
                        >
                            <TextArea {...register('reason')} />
                        </Field>
                    </Gap>
                </Box>
                <Box>
                    <PetInfo pet={pet} customerId={pet.userId} />
                </Box>
                <Gap direction="horizontal" className={style('button-container')}>
                    <Button size={ButtonSize.LARGE} onClick={goBack}>
                        CANCELAR
                    </Button>
                    <Button
                        type="submit"
                        variant={ButtonVariant.SUCCESS}
                        size={ButtonSize.LARGE}
                        disabled={loading}
                    >
                        AGENDAR
                    </Button>
                </Gap>
            </Gap>
        </form>
    );
}
