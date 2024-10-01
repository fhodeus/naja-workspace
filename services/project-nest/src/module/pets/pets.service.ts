import { Injectable } from '@nestjs/common';
import { Pet } from 'src/database/entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../_shared/base/base.repository';

@Injectable()
export class PetsService extends BaseRepository<Pet> {
    constructor(@InjectRepository(Pet) protected readonly petRepository: Repository<Pet>) {
        super(petRepository);
    }
}
