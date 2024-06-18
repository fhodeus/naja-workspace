import { Service } from 'typedi';
import { validate as uuidValidate } from 'uuid';

import { FinancialRepository } from '../repositories/financial.repositorie';
import { Financial } from '../models/financial.model';

@Service()
export class FinancialService extends FinancialRepository {
    public find(): Promise<Financial[]> {
        return this.financialRepository.find({ cache: true });
    }

    public findOne(id: string): Promise<Financial> {
        if (!uuidValidate(id)) {
            return null;
        }
        return this.financialRepository.findOne({ where: { id }, cache: true });
    }

    public update(id: string, inventory: Financial): Promise<Financial> {
        inventory.id = id;

        return this.financialRepository.save(inventory);
    }

    public populate(financial: Financial) {
        return this.financialRepository.save(financial);
    }
}
