import { Gap } from '@endeavour/ui-kit';
import type { PetResponse } from '@endeavour/verification-integration';

import { LabelData } from '../../../shared/components/label-data/label-data';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './pet-info-profile.module.scss';

const style = createStyleHelper(styles, 'pet-info');

export const PetInfoProfile = ({ pet }: { pet: PetResponse }) => {
    const dataObjStart = new Date(pet.createAt);

    const diaStart = String(dataObjStart.getUTCDate()).padStart(2, '0');
    const mesStart = String(dataObjStart.getUTCMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
    const anoStart = dataObjStart.getUTCFullYear();

    const dataFormatada = `${diaStart}/${mesStart}/${anoStart}`;

    return (
        <Gap>
            <div className={style('client-info-content')}>
                <LabelData label={'Raça e Espécie'} data={pet.breed} />
                <LabelData label={'Data de Nascimento ou Idade'} data={pet.dob} />
                <LabelData label={'Sexo'} data={pet.gender} />
                <LabelData label={'Peso e Tamanho'} data={`${pet.weight} / ${pet.size}`} />
                <LabelData label={'Histórico de Vacinação'} data={pet.healthHistory} />
                <LabelData label={'Histórico de Saúde'} data={pet.healthHistory} />
                <LabelData label={'Alergias e Medicamentos'} data={pet.allergiesAndMedications} />
                <LabelData label={'Microchip ou Número de Identificação'} data={pet.microchip} />
                <LabelData label={'Nome do Veterinário Preferido'} data={'Veterinário Preferido'} />
                <LabelData label={'Data da Última Visita'} data={pet.lastVisit} />
                <LabelData label={'Registrado em'} data={dataFormatada} />
            </div>
        </Gap>
    );
};
