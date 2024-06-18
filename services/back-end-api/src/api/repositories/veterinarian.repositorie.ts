import { Service } from 'typedi';
import { AppDataSource } from '../../data-source';
import { Veterinarian } from '../models/veterinarian.model';
import { Repository } from 'typeorm';

@Service()
export class VeterinarianRepository {
    public veterinarianRepository: Repository<Veterinarian>;

    constructor() {
        this.veterinarianRepository = AppDataSource.getRepository(Veterinarian);
    }
}
