import { Service } from 'typedi';
import { validate as uuidValidate } from 'uuid';

import type { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repositorie';
import { DeleteResult, Like } from 'typeorm';

@Service()
export class UserService extends UserRepository {
    public find(name?: string, document?: string): Promise<User[]> {
        return this.userRepository.find({
            relations: ['pets'],
            where: {
                fullName: !!name ? Like(`${name}%`) : undefined,
                document: !!document ? Like(`${document}%`) : undefined,
            },
        });
    }

    public findOne(id: string): Promise<User | undefined> {
        if (!uuidValidate(id)) {
            return null;
        }

        return this.userRepository.findOne({
            where: {
                id,
            },
            relations: ['pets'],
        });
    }

    public async create(user: User): Promise<User> {
        const newUser = await this.userRepository.save(user);
        return newUser;
    }

    public update(id: string, user: User): Promise<User> {
        user.id = id;
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<DeleteResult> {
        const result = await this.userRepository.delete(id);
        return result;
    }
}
