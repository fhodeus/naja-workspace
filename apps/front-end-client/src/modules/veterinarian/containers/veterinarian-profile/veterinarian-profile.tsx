import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { consultationService } from '../../../../service/consultation.service';
import { veterinarianService } from '../../../../service/veterinarian.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { Await } from '../../../shared/utils/loader';
import { PetPage } from '../../components/veterinarian-page/veterinarian-page';

export function VeterinarianProfile() {
    const params = useParams();
    const loader = {
        veterianrian: veterinarianService.getVeterinarian(params.id ?? ''),
        consultation: consultationService.getConsultationsByVeterinarian(params.id ?? ''),
    };

    useDashboardHeader('Perfil do Veterinário');

    return (
        <div>
            <Suspense
                fallback={useMemo(
                    () => (
                        <Loader />
                    ),
                    [],
                )}
            >
                <Await resolve={Promise.all([loader.veterianrian, loader.consultation])}>
                    {([{ content: veterinarian }, { content: dataConsultation }]) => (
                        <PetPage veterinarian={veterinarian} consultations={dataConsultation} />
                    )}
                </Await>
            </Suspense>
        </div>
    );
}
