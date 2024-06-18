import { Service } from 'typedi';
import { AppDataSource } from '../../data-source';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';

@Service()
export class UserRepository {
    public userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }
}
