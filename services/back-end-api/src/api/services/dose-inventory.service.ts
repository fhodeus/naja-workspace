import { Service } from 'typedi';

import { DoseInventoryRepository } from '../repositories/dose-inventory.repositorie';
import { DoseInventory } from '../models/dose-inventory.model';

@Service()
export class DoseInventoryService extends DoseInventoryRepository {
    public async create(inventory: DoseInventory): Promise<DoseInventory> {
        return this.doseInventoryRepository.save(inventory);
    }

    public async update(id: string, inventory: DoseInventory): Promise<DoseInventory> {
        inventory.id = id;

        return this.doseInventoryRepository.save(inventory);
    }
}
