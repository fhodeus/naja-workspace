import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseEntity } from './base.entity';

export interface IBaseRepository<T extends BaseEntity> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<UpdateResult>;
    delete(id: string): Promise<DeleteResult>;
}
