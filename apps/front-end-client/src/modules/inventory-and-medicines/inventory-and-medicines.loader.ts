import { inventoryService } from '../../service/inventory.service';
import { deferredLoader } from '../shared/utils/loader';

export const inventoryAndMedicinesLoader = deferredLoader(({ params }) => {
    return { response: inventoryService.getInventorie(params.id ?? '') };
});
