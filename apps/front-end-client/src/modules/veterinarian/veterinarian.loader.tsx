import { veterinarianService } from '../../service/veterinarian.service';
import { deferredLoader } from '../shared/utils/loader';

export const veterinarianLoader = deferredLoader(({ params }) => {
    return { response: veterinarianService.getVeterinarian(params.id ?? '') };
});
