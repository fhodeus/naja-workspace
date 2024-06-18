import React, { useCallback, useState } from 'react';

import { Divider, Gap, Title } from '@endeavour/ui-kit';
import type { ConsultationResponse, InventoryResponse } from '@endeavour/verification-integration';

import { consultationService } from '../../../../service/consultation.service';
import { useContextNavigate } from '../../../shared/hooks/use-context-navigate';
import { createStyleHelper } from '../../../shared/utils/class-names';
import type { IConsultationSchema } from '../consultation-form/consultation.schema';
import { SchedulingForm } from '../scheduling-form/scheduling-form';

import styles from './scheduling-page.module.scss';

const style = createStyleHelper(styles, 'scheduling-page');

export function SchedulingPageComponent({
    consultation,
    inventory,
}: {
    consultation: ConsultationResponse;
    inventory: InventoryResponse[];
}) {
    const navigate = useContextNavigate();
    const [loading, setLoading] = useState(false);

    const postScheduling = useCallback(
        async (payload: IConsultationSchema) => {
            setLoading(true);
            const { content } = await consultationService.updateConsultation({
                payload,
                query: payload.id,
            });
            setLoading(false);

            navigate(`/dashboard/pet/${content.pet.userId}/${content.petId}/${content.id}`);
        },
        [navigate],
    );

    return (
        <Gap className={style(undefined)}>
            <Title>Agendamento de Consulta</Title>
            <Divider />
            <SchedulingForm
                inventory={inventory}
                className={style('form-consultation')}
                consultation={consultation}
                onSubmit={postScheduling}
                loading={loading}
            />
        </Gap>
    );
}
