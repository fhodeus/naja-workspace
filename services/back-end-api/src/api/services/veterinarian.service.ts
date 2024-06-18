import { Service } from 'typedi';
import { validate as uuidValidate } from 'uuid';

import { VeterinarianRepository } from '../repositories/veterinarian.repositorie';
import { Veterinarian } from '../models/veterinarian.model';
import { Like } from 'typeorm';

@Service()
export class VeterinarianService extends VeterinarianRepository {
    public find(name?: string): Promise<Veterinarian[]> {
        return this.veterinarianRepository.find({
            relations: ['consultations'],
            where: {
                fullName: !!name ? Like(`${name}%`):undefined,
            },
        });
    }

    public findOne(id: string): Promise<Veterinarian | undefined> {
        if (!uuidValidate(id)) {
            return null;
        }
        return this.veterinarianRepository.findOne({
            where: {
                id,
            },
        });
    }

    public async create(pet: Veterinarian): Promise<Veterinarian> {
        const newPet = await this.veterinarianRepository.save(pet);
        return newPet;
    }

    public update(id: string, pet: Veterinarian): Promise<Veterinarian> {
        pet.id = id;
        return this.veterinarianRepository.save(pet);
    }

    public async delete(id: string): Promise<void> {
        await this.veterinarianRepository.delete(id);
        return;
    }
}
