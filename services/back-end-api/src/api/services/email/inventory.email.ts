import { Service } from 'typedi';

import { EmailService } from './gateway/email.adapter';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../../models/inventory.model';

@Service()
export class InventoryEmail {
    constructor(private inventoryService: InventoryService, private emailService: EmailService) {}

    public async sendStockNotification(id: string): Promise<void> {
        const inventory = await this.inventoryService.findOne(id);

        this.validStockNotification(inventory);
    }

    public async findOutStockNotification(): Promise<void> {
        const inventories = await this.inventoryService.find();

        for (const inventory of inventories) {
            this.validStockNotification(inventory);
        }
    }

    public async validStockNotification(inventory: Inventory): Promise<void> {
        const used = inventory.doseInventory.filter((e) => !!e.consultationId).length;

        if (used >= inventory.quantity) {
            this.emailService.sendEmail(
                ['bxnandoxd@edu.unifil.br'],
                'Item Esgotado',
                `
                    <p>Item esgotado ${inventory.id}</p>
                    <p>O Item ${inventory.name}</p>
                    <p>Nao tem mais itens disponiveis para uso</p>
                `,
            );
            return;
        }

        if (used >= inventory.reorderPoint) {
            this.emailService.sendEmail(
                ['bxnandoxd@edu.unifil.br'],
                'Item em ponto de reabastecimento',
                `
                    <p>Item em ponto de reordem ${inventory.id}</p>
                    <p>O Item ${inventory.name}</p>
                    <p>Entrou no ponto de reabastecimento</p>
                    <p>Reabasteca antes que o item acabe</p>
                `,
            );
            return;
        }
    }
}
