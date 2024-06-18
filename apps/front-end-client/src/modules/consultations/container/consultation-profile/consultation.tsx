import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { consultationService } from '../../../../service/consultation.service';
import { petService } from '../../../../service/pets.service';
import { veterinarianService } from '../../../../service/veterinarian.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { Await } from '../../../shared/utils/loader';
import { ConsultationPageComponent } from '../../components/consultation-page/consultation-page';

import styles from './consultation.module.scss';

const style = createStyleHelper(styles, 'consultation-container');

export const ConsultationContainer = () => {
    const params = useParams();
    const loader = {
        consultations: consultationService.getConsultations(),
        veterinarians: veterinarianService.getVeterinarians(),
        pet: petService.getPet(params.id ?? ''),
    };

    const fallback = useMemo(() => <Loader message="carregando" />, []);

    useDashboardHeader('Agendamento de Consultas');

    return (
        <div className={style()}>
            <Suspense fallback={fallback}>
                <Await
                    resolve={Promise.all([loader.veterinarians, loader.pet, loader.consultations])}
                >
                    {([
                        { content: dataVeterinarians },
                        { content: dataPet },
                        { content: dataConsultations },
                    ]) => (
                        <ConsultationPageComponent
                            veterinarians={dataVeterinarians}
                            pet={dataPet}
                            consultations={dataConsultations}
                        />
                    )}
                </Await>
            </Suspense>
        </div>
    );
};
