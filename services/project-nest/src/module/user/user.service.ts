import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from '../_shared/base/base.repository';

@Injectable()
export class UserService extends BaseRepository<User> {
    constructor(@InjectRepository(User) protected readonly userRepository: Repository<User>) {
        super(userRepository);
    }
}
