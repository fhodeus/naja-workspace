import { EntitySubscriberInterface, EventSubscriber, LoadEvent } from 'typeorm';
import { Consultation } from '../models/consultation.model';
import { Service } from 'typedi';
import { InventoryService } from '../services/inventory.service';
import { Inventory } from '../models/inventory.model';

@Service()
@EventSubscriber()
export class ConsultationSubscriber implements EntitySubscriberInterface<Consultation> {
    listenTo() {
        return Consultation;
    }

    async afterLoad(entity: Consultation, event?: LoadEvent<Consultation>): Promise<any> {
        if (entity.doseInventory) {
            const acc = entity.doseInventory.reduce((acc, cur) => {
                acc = { ...acc, [cur.inventoryId]: cur.inventoryId };

                return acc;
            }, {});
            const inventoyIdList = Object.keys(acc);

            if (inventoyIdList.length > 0) {
                const service = new InventoryService();

                const arrayPromise = inventoyIdList.map((inventoyId) => {
                    return new Promise<Inventory>(async (resolve, reject) => {
                        const inventory = await service.findOne(inventoyId);

                        if (inventory) {
                            resolve(inventory);
                        } else {
                            reject();
                        }
                    });
                });

                const Inventories = await Promise.all(arrayPromise);

                entity.doseInventory.forEach((dose) => {
                    const relationInventorie = Inventories.find((e) => e.id === dose.inventoryId);
                    dose.name = relationInventorie?.name ?? 'name-not-found';
                });
            }
        }
    }
}
