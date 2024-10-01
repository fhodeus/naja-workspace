import { IBaseRepository } from './base.interface';
import { BaseEntity } from './base.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

export abstract class BaseService<T extends BaseEntity> {
    constructor(private readonly repository: IBaseRepository<T>) {}

    async findAll(): Promise<T[]> {
        return this.repository.findAll();
    }

    async findById(id: string): Promise<T> {
        return this.repository.findById(id);
    }

    async create(data: Partial<T>): Promise<T> {
        return this.repository.create(data);
    }

    async update(id: string, data: Partial<T>): Promise<UpdateResult> {
        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}
