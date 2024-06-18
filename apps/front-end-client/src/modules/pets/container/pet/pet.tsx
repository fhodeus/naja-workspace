import React, { Suspense, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { customerService } from '../../../../service/customer.service';
import { petService } from '../../../../service/pets.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { useContextNavigate } from '../../../shared/hooks/use-context-navigate';
import { Await } from '../../../shared/utils/loader';
import { PetForm } from '../../components/pet-form/pet-form';
import type { IPetSchema } from '../../components/pet-form/pet-form.schema';

export const PetContainer = () => {
    useDashboardHeader('Pet');

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const loader = {
        pet: petService.getPet(params.petId ?? ''),
        customer: customerService.getCustomer(params.userId ?? ''),
    };

    const navigate = useContextNavigate();

    const postPet = async (payload: IPetSchema) => {
        setLoading(true);
        const config = { query: payload.id, payload };

        const send = !payload.id ? petService.createPet : petService.updatePet;

        const { content } = await send.bind(petService, config)();

        if (!params.consultationId) {
            navigate('/dashboard/customer/profile/' + content.userId);
        } else {
            navigate('/dashboard/consultations/scheduling/' + params.consultationId);
        }
        setLoading(false);
    };

    const fallback = useMemo(() => <Loader message="carregando" />, []);

    return (
        <div>
            <Suspense fallback={fallback}>
                <Await resolve={Promise.all([loader.pet, loader.customer])}>
                    {([{ content: dataPet }, { content: dataCustomer }]) => (
                        <PetForm
                            pet={dataPet}
                            customer={dataCustomer}
                            onSubmit={postPet}
                            loading={loading}
                        />
                    )}
                </Await>
            </Suspense>
        </div>
    );
};
