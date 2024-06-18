import { Service } from 'typedi';
import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { Financial } from '../models/financial.model';

@Service()
export class FinancialRepository {
    public financialRepository: Repository<Financial>;

    constructor() {
        this.financialRepository = AppDataSource.getRepository(Financial);
    }
}
