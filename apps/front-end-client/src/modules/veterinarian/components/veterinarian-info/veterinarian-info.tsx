import React from 'react';

import { Divider, Gap } from '@endeavour/ui-kit';
import type { VeterinarianResponse } from '@endeavour/verification-integration';

import { LabelData } from '../../../shared/components/label-data/label-data';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './veterinarian-info.module.scss';

const style = createStyleHelper(styles, 'veterinarian-info');

export const VeterinarianInfoComponent = ({
    veterinarian,
}: {
    veterinarian: VeterinarianResponse;
}) => {
    return (
        <div className={style()}>
            <Gap className={style('client-info-aside')}>
                <LabelData label={'Data Registro'} data={'Data Registro data'} />
                <LabelData label={'Email'} data={veterinarian.email} />
            </Gap>
            <Divider vertical />
            <div className={style('client-info-content')}>
                <LabelData label={'Telefone'} data={veterinarian.telephone} />
                <LabelData label={'Data de Nascimento'} data={veterinarian.bod} />
                <LabelData label={'Endereço'} data={veterinarian.address} />
                <LabelData label={'Histórico Médico'} data={veterinarian.medicalHistory} />
            </div>
        </div>
    );
};
