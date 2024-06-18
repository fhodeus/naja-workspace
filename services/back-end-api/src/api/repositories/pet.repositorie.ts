import { Pet } from '../models/pet.model';
import { Service } from 'typedi';
import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';

@Service()
export class PetRepository {
    public petRepository: Repository<Pet>;

    constructor() {
        this.petRepository = AppDataSource.getRepository(Pet);
    }

    /**
     * Find by user_id is used for our data-loader to get all needed pets in one query.
     */
    public findByUserIds(ids: string[]): Promise<Pet[]> {
        return this.petRepository
            .createQueryBuilder()
            .select()
            .where(`pet.user_id IN (${ids.map((id) => `'${id}'`).join(', ')})`)
            .getMany();
    }
}
