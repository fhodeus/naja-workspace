import type { DoseInventory } from "./dose-inventory.interface";

export interface BaseInventory {
    name: string;
    lote: string;
    manufacturinData: string;
    expirationDate: string;
    quantity: number;
    supplier: string;
    purchasePrice: string;
    salePrice: string;
    storageLocation: string;
    reorderPoint: number;
    usageAndAdministrationNotes: string;
    substanceControlRecord: string;
    safetyInformation: string;
    additionalNotes: string;
}

export interface InventoryResponse extends BaseInventory {
    id: string;
    doseInventory: DoseInventory[];
}
