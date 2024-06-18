import { consultationService } from '../../service/consultation.service';
import { inventoryService } from '../../service/inventory.service';
import { petService } from '../../service/pets.service';
import { veterinarianService } from '../../service/veterinarian.service';
import { deferredLoader } from '../shared/utils/loader';

export const consultationLoader = deferredLoader(({ params }) => {
    return {
        consultations: consultationService.getConsultations(),
        veterinarians: veterinarianService.getVeterinarians(),
        pet: petService.getPet(params.id ?? ''),
    };
});

export const schedulingLoader = deferredLoader(({ params }) => {
    return {
        consultation: consultationService.getConsultation(params.id ?? ''),
        inventory: inventoryService.getInventoriesInStock(),
    };
});

export const serviceLoader = deferredLoader(({ params }) => {
    return {
        consultation: consultationService.getConsultation(params.id ?? ''),
    };
});
