import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as uuid from 'uuid';
import { User } from '../../api/models/user.model';

export class CreateBruce implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(User);

        await repository.insert([
            {
                id: uuid.v1(),
                fullName: 'Bruce Wayne',
                email: 'bruce.wayne@wayne-enterprises.com',
                address: 'gotham',
                telephone: '(99) 99999-9999',
                bod: '43',
                profession: 'hero',
                medicalHistory: '',
                pets: [],
            },
        ]);

        const userFactory = await factoryManager.get(User);

        await userFactory.save();
        await userFactory.saveMany(5);
    }
}

export default CreateBruce;