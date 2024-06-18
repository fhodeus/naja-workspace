import { Service } from 'typedi';
import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { Inventory } from '../models/inventory.model';

@Service()
export class InventoryRepository {
    public inventoryRepository: Repository<Inventory>;

    constructor() {
        this.inventoryRepository = AppDataSource.getRepository(Inventory);
    }
}
