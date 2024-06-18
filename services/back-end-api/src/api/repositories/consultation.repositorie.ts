import { Service } from 'typedi';
import { AppDataSource } from '../../data-source';
import { Consultation } from '../models/consultation.model';
import { Repository } from 'typeorm';

@Service()
export class ConsultationRepository {
    public consultationRepository: Repository<Consultation>;

    constructor() {
        this.consultationRepository = AppDataSource.getRepository(Consultation);
    }
}
