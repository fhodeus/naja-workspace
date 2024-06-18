import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { consultationService } from '../../../../service/consultation.service';
import { customerService } from '../../../../service/customer.service';
import { petService } from '../../../../service/pets.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { Await } from '../../../shared/utils/loader';
import { PetPage } from '../../components/pet-page/pet-page';

export function PetProfileContainer() {
    const params = useParams();
    useDashboardHeader('Perfil do Pet');
    const loader = {
        pet: petService.getPet(params.petId ?? ''),
        customer: customerService.getCustomer(params.userId ?? ''),
        consultation: consultationService.getConsultationsByPet(params.petId ?? ''),
    };


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
                <Await resolve={Promise.all([loader.pet, loader.customer, loader.consultation])}>
                    {([
                        { content: dataPet },
                        { content: dataCustomer },
                        { content: dataConsultation },
                    ]) => (
                        <PetPage
                            pet={dataPet}
                            customer={dataCustomer}
                            consultations={dataConsultation}
                        />
                    )}
                </Await>
            </Suspense>
        </div>
    );
}
