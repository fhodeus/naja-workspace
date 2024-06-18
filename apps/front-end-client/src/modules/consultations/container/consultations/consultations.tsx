import React, { useCallback, useEffect, useState } from 'react';

import { Box, Divider, Gap, Title } from '@endeavour/ui-kit';
import type { BaseConsultation } from '@endeavour/verification-integration';

import { consultationService } from '../../../../service/consultation.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Calendar } from '../../../shared/components/calendar/calendar';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './consultation.module.scss';

const style = createStyleHelper(styles, 'consultation-list-container');

export function Consultations() {
    useDashboardHeader('Consultas Agendadas');
    
    const [consultations, setConsultations] = useState<BaseConsultation[]>([]);
    const [loading, setLoading] = useState(true);

    const fetch = useCallback(async () => {
        const t = await consultationService.getConsultations();
        setLoading(false);
        setConsultations(t.content);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return (
        <Gap className={style(undefined)}>
            <Gap direction="horizontal" className={style('page-title-container')}>
                <Title>Consultas Agendadas</Title>
            </Gap>
            <Divider />
            {loading ? (
                <Loader message="carregando" />
            ) : (
                <Box>
                    <Calendar
                        events={consultations.map((e) => ({
                            title: e.id,
                            start: new Date(e.day + 'T' + e.startTime),
                            end: new Date(e.day + 'T' + e.endTime),
                            extendedProps: { ...e },
                        }))}
                    />
                </Box>
            )}
        </Gap>
    );
}
