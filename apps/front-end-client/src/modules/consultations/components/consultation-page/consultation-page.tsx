import React, { useCallback, useState } from 'react';

import { Divider, Gap, Title } from '@endeavour/ui-kit';
import type {
    BaseConsultation,
    PetResponse,
    VeterinarianResponse,
} from '@endeavour/verification-integration';

import { consultationService } from '../../../../service/consultation.service';
import { useContextNavigate } from '../../../shared/hooks/use-context-navigate';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { ConsultationForm } from '../consultation-form/consultation-form';
import type { IConsultationSchema } from '../consultation-form/consultation.schema';

import styles from './consultation-page.module.scss';

const style = createStyleHelper(styles, 'consultation-page');

export function ConsultationPageComponent({
    veterinarians,
    pet,
    consultations,
}: {
    veterinarians: VeterinarianResponse[];
    pet: PetResponse;
    consultations: BaseConsultation[];
}) {
    const navigate = useContextNavigate();
    const [loading, setLoading] = useState(false);

    const postCustomer = useCallback(
        async (payload: IConsultationSchema) => {
            setLoading(true);
            await consultationService.createConsultation({ payload });
            setLoading(false);
            navigate('/dashboard/consultations');
        },
        [navigate],
    );

    return (
        <Gap className={style(undefined)}>
            <Title>Agendamento de Consulta</Title>
            <Divider />
            <ConsultationForm
                pet={pet}
                loading={loading}
                onSubmit={postCustomer}
                veterinarians={veterinarians}
                consultations={consultations}
                className={style('form-consultation')}
            />
        </Gap>
    );
}
