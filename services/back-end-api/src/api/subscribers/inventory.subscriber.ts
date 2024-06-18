import { EntitySubscriberInterface, EventSubscriber, LoadEvent } from 'typeorm';
import { Inventory } from '../models/inventory.model';

@EventSubscriber()
export class InventorySubscriber implements EntitySubscriberInterface<Inventory> {
    listenTo() {
        return Inventory;
    }

    afterLoad(entity: Inventory, event?: LoadEvent<Inventory>): void | Promise<any> {
        if (entity.doseInventory) {
            entity.doseInventory.forEach((dose) => {
                dose.name = entity.name;
            });
        }
    }
}
