import { consultationService } from '../../service/consultation.service';
import { customerService } from '../../service/customer.service';
import { petService } from '../../service/pets.service';
import { deferredLoader } from '../shared/utils/loader';

export const petLoader = deferredLoader(({ params }) => {
    return {
        pet: petService.getPet(params.petId ?? ''),
        customer: customerService.getCustomer(params.userId ?? ''),
    };
});

export const petLoaderProfile = deferredLoader(({ params }) => {
    return {
        pet: petService.getPet(params.petId ?? ''),
        customer: customerService.getCustomer(params.userId ?? ''),
        consultation: consultationService.getConsultationsByPet(params.petId ?? ''),
    };
});
