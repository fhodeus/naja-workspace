import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from '../_shared/base/base.repository';
import { IBaseRepository } from '../_shared/base/base.interface';

export class UserRepository extends BaseRepository<User> implements IBaseRepository<User> {
    constructor(repository: Repository<User>) {
        super(repository);
    }
}
