import {
    DeleteResult,
    FindOneOptions,
    FindOptionsWhere,
    ObjectLiteral,
    Repository,
    UpdateResult,
} from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseRepository<T extends BaseEntity & ObjectLiteral> {
    constructor(protected readonly repository: Repository<T>) {}

    async findAll(): Promise<T[]> {
        const users = await this.repository.find();
        return users;
    }

    async create(entity: T) {
        const user = await this.repository.create(entity);
        return user;
    }

    async findById(id: string | number): Promise<T> {
        const where: FindOptionsWhere<T> = [{ id: `${id}` }] as unknown as FindOptionsWhere<T>;
        const options: FindOneOptions<T> = { where };

        const user = await this.repository.findOne(options);

        if (!user) throw new Error('User not found');

        return user;
    }

    async update(id: number | string, partialEntity: Partial<T>): Promise<UpdateResult> {
        const result = await this.repository.update(id, partialEntity);

        return result;
    }

    async delete(id: number | string): Promise<DeleteResult> {
        const result = await this.repository.delete(id);

        return result;
    }
}
