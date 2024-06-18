import { Service } from 'typedi';
import { validate as uuidValidate } from 'uuid';

import type { Pet } from '../models/pet.model';
import type { User } from '../models/user.model';
import { PetRepository } from '../repositories/pet.repositorie';
import { DeleteResult, FindManyOptions } from 'typeorm';

@Service()
export class PetService extends PetRepository {
    public find(options?: FindManyOptions<Pet>): Promise<[Pet[], number]> {
        return this.petRepository.findAndCount({ relations: ['user'], cache: true, ...options });
    }

    public findByUser(user: User): Promise<Pet[]> {
        return this.petRepository.find({
            relations: ['consultations'],
            where: {
                userId: user.id,
            },
        });
    }

    public findOne(id: string): Promise<Pet | undefined> {
        if (!uuidValidate(id)) {
            return null;
        }
        return this.petRepository.findOne({
            relations: ['consultations'],
            where: {
                id,
            },
        });
    }

    public async create(pet: Pet): Promise<Pet> {
        const newPet = await this.petRepository.save(pet);
        return newPet;
    }

    public async update(id: string, pet: Pet): Promise<Pet> {
        const currentPet = await this.petRepository.findOne({
            where: { id },
        });

        return this.petRepository.save({ ...currentPet, ...pet });
    }

    public async delete(id: string): Promise<DeleteResult> {
        const result = await this.petRepository.delete(id);
        return result;
    }
}
