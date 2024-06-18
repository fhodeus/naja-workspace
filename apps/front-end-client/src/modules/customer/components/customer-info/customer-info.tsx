import React from 'react';

import { Divider, Gap } from '@endeavour/ui-kit';
import type { UserResponse } from '@endeavour/verification-integration';

import { LabelData } from '../../../shared/components/label-data/label-data';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './customer-info.module.scss';

const style = createStyleHelper(styles, 'customer-info');

export const CustomerInfo = ({ customer }: { customer: UserResponse }) => {
    const dataObjStart = new Date(customer.creataAt);

    const diaStart = String(dataObjStart.getUTCDate()).padStart(2, '0');
    const mesStart = String(dataObjStart.getUTCMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
    const anoStart = dataObjStart.getUTCFullYear();

    const dataFormatada = `${diaStart}/${mesStart}/${anoStart}`;

    return (
        <div className={style()}>
            <Gap className={style('client-info-aside')}>
                <LabelData label={'Data Registro'} data={'Data Registro data'} />
                <LabelData label={'Email'} data={customer.email} />
            </Gap>
            <Divider vertical />
            <div className={style('client-info-content')}>
                <LabelData label={'Telefone'} data={customer.telephone} />
                <LabelData label={'Data de Nascimento'} data={customer.bod} />
                <LabelData label={'Endereço'} data={customer.address} />
                <LabelData label={'Profissão'} data={customer.profession} />
                <LabelData label={'Histórico Médico'} data={customer.medicalHistory} />
                <LabelData label={'Registrado em'} data={dataFormatada} />
            </div>
        </div>
    );
};
