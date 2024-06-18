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
import type { PetResponse, UserResponse } from '@endeavour/verification-integration';

import { useGoBack } from '../../../shared/hooks/use-go-back';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './pet-form.module.scss';
import { registrationResolver, type IPetSchema } from './pet-form.schema';

const style = createStyleHelper(styles, 'pet-form');

interface IPetForm {
    pet?: PetResponse;
    customer?: UserResponse;
    onSubmit: (data: IPetSchema) => void;
    loading: boolean;
}

export const PetForm = ({ pet, customer, onSubmit, loading }: IPetForm) => {
    const goBack = useGoBack();

    const useFormInitial: UseFormProps<IPetSchema> = useMemo(
        () => ({
            resolver: registrationResolver(),
            defaultValues: {
                id: pet?.id ?? '',

                name: pet?.name ?? '',
                age: pet?.age ?? 0,
                dob: pet?.dob ?? '',
                breed: pet?.breed ?? '',
                species: pet?.species ?? '',
                gender: pet?.gender ?? '',
                weight: pet?.weight ?? '',
                size: pet?.size ?? '',
                healthHistory: pet?.healthHistory ?? '',
                allergiesAndMedications: pet?.allergiesAndMedications ?? '',
                microchip: pet?.microchip ?? '',
                specialNotes: pet?.specialNotes ?? '',
                lastVisit: pet?.lastVisit ?? '',

                userId: customer?.id ?? '',
            },
        }),
        [pet, customer],
    );

    const form = useForm<IPetSchema>(useFormInitial);

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Gap>
                <Box className={style('form-profile')}>
                    <Gap>
                        <div>
                            <div className={style('client-name')}>Pet</div>
                            {pet?.user?.id ? <ContentId>{pet.user.id}</ContentId> : null}
                        </div>
                        <Divider />
                        <Gap direction="horizontal">
                            <Field label={'Nome do Responsável'}>
                                <Input
                                    disabled
                                    value={customer?.fullName}
                                    placeholder="Nome do Responsável"
                                />
                            </Field>
                            <Field
                                label={'Id Responsável'}
                                hasError={!!errors.userId}
                                message={errors.userId?.message}
                            >
                                <Input disabled {...register('userId')} placeholder="Responsável" />
                            </Field>
                        </Gap>
                        <Field
                            label={'Nome'}
                            hasError={!!errors.name}
                            message={errors.name?.message}
                        >
                            <Input {...register('name')} placeholder="Nome" />
                        </Field>
                        <Field
                            label={'Idade'}
                            hasError={!!errors.age}
                            message={errors.age?.message}
                        >
                            <Input
                                {...register('age', { setValueAs: (value) => Number(value) })}
                                type="number"
                                placeholder="Idade"
                            />
                        </Field>
                        <Field
                            label={'Data de nascimento'}
                            hasError={!!errors.dob}
                            message={errors.dob?.message}
                        >
                            <Input {...register('dob')} type="date" placeholder="" />
                        </Field>
                        <Field
                            label={'Raça'}
                            hasError={!!errors.breed}
                            message={errors.breed?.message}
                        >
                            <Input {...register('breed')} placeholder="Raça" />
                        </Field>
                        <Field
                            label={'Espécie'}
                            hasError={!!errors.species}
                            message={errors.species?.message}
                        >
                            <Input {...register('species')} placeholder="Espécie" />
                        </Field>
                        <Field
                            label={'Gênero'}
                            hasError={!!errors.gender}
                            message={errors.gender?.message}
                        >
                            <Input {...register('gender')} placeholder="Gênero" />
                        </Field>
                        <Field
                            label={'Peso'}
                            hasError={!!errors.weight}
                            message={errors.weight?.message}
                        >
                            <Input {...register('weight')} placeholder="Peso" />
                        </Field>
                        <Field
                            label={'Tamanho'}
                            hasError={!!errors.size}
                            message={errors.size?.message}
                        >
                            <Input {...register('size')} placeholder="Tamanho" />
                        </Field>
                        <Field
                            label={'Histórico Médico'}
                            hasError={!!errors.healthHistory}
                            message={errors.healthHistory?.message}
                        >
                            <Input {...register('healthHistory')} placeholder="Histórico médico" />
                        </Field>
                        <Field
                            label={'Alergias e Medicações'}
                            hasError={!!errors.allergiesAndMedications}
                            message={errors.allergiesAndMedications?.message}
                        >
                            <Input
                                {...register('allergiesAndMedications')}
                                placeholder="Alergias e Medicacoes"
                            />
                        </Field>
                        <Field
                            label={'Chip'}
                            hasError={!!errors.microchip}
                            message={errors.microchip?.message}
                        >
                            <Input {...register('microchip')} placeholder="Chip" />
                        </Field>
                        <Field
                            label={'Notas Especiais'}
                            hasError={!!errors.specialNotes}
                            message={errors.specialNotes?.message}
                        >
                            <Input {...register('specialNotes')} placeholder="Notas Especiais" />
                        </Field>
                        <Field
                            label={'Última Visita'}
                            hasError={!!errors.lastVisit}
                            message={errors.lastVisit?.message}
                        >
                            <Input
                                {...register('lastVisit')}
                                type="date"
                                placeholder="Última Visita"
                            />
                        </Field>
                        <pre></pre>
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
                        {!pet ? 'CREATE' : 'ATUALIZAR'}
                    </Button>
                </Gap>
            </Gap>
        </form>
    );
};
