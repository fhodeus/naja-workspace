import { Service } from 'typedi';
import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { DoseInventory } from '../models/dose-inventory.model';

@Service()
export class DoseInventoryRepository {
    public doseInventoryRepository: Repository<DoseInventory>;

    constructor() {
        this.doseInventoryRepository = AppDataSource.getRepository(DoseInventory);
    }
}
