import type { InventoryResponse } from '../models';

export interface InventoryResponseViewModel extends InventoryResponse {
    used: number;
}
