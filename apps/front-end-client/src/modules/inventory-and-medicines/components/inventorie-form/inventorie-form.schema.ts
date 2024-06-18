import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const inventorieSchema = () =>
    z.object({
        id: z.string(),
        name: z.string().min(1).max(300),
        lote: z.string().min(1).max(300),
        manufacturinData: z.string().min(1).max(300),
        expirationDate: z.string().min(1).max(300),
        quantity: z.number().gte(0),
        supplier: z.string().min(1).max(300),
        purchasePrice: z.string().min(1).max(300),
        salePrice: z.string().min(1).max(300),
        storageLocation: z.string().min(1).max(300),
        reorderPoint: z.number().gte(0),
        usageAndAdministrationNotes: z.string().min(1).max(300),
        substanceControlRecord: z.string().min(1).max(300),
        safetyInformation: z.string().min(1).max(300),
        additionalNotes: z.string().min(1).max(300),
    });

export const registrationResolver = () => zodResolver(inventorieSchema());

export type IInventoryProfile = z.infer<ReturnType<typeof inventorieSchema>>;
