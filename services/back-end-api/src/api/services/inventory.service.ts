import { Service } from 'typedi';
import { validate as uuidValidate } from 'uuid';

import { InventoryRepository } from '../repositories/inventory.repositorie';
import { Inventory } from '../models/inventory.model';
import { FindManyOptions, IsNull } from 'typeorm';

@Service()
export class InventoryService extends InventoryRepository {
    public find(options?: FindManyOptions<Inventory>): Promise<Inventory[]> {
        return this.inventoryRepository.find({ relations: ['doseInventory'], ...options });
    }

    public findOne(id: string): Promise<Inventory> {
        if (!uuidValidate(id)) {
            return null;
        }
        return this.inventoryRepository.findOne({ where: { id }, relations: ['doseInventory'] });
    }

    public findInStock(): Promise<Inventory[]> {
        return this.inventoryRepository.find({
            where: {
                doseInventory: {
                    consultationId: IsNull(),
                },
            },
            relations: ['doseInventory'],
        });
    }

    public async create(inventory: Inventory): Promise<Inventory> {
        inventory.id = undefined;

        return this.inventoryRepository.save(inventory);
    }

    public async update(id: string, inventory: Inventory): Promise<Inventory> {
        inventory.id = id;

        return this.inventoryRepository.save(inventory);
    }

    public async delete(id: string): Promise<void> {
        await this.inventoryRepository.delete(id);
        return;
    }
}
