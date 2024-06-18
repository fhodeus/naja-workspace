import type {
    BaseInventory,
    GenericResponse,
    InventoryResponse,
    InventoryResponseViewModel,
} from '@endeavour/verification-integration';

import type HttpClient from './gateway/axios.adapter';
import { httpClient } from './gateway/axios.adapter';

class InventoryService {
    constructor(readonly httpClient: HttpClient) {}

    async getInventories(): Promise<GenericResponse<InventoryResponseViewModel[]>> {
        const inventories = await this.httpClient.get<
            GenericResponse<InventoryResponseViewModel[]>
        >('/api/inventory');

        return inventories;
    }

    async getInventorie(id: string): Promise<GenericResponse<InventoryResponseViewModel>> {
        const inventory = await this.httpClient.get<GenericResponse<InventoryResponseViewModel>>(
            '/api/inventory/' + id,
        );

        return inventory;
    }

    async getInventoriesInStock(): Promise<GenericResponse<InventoryResponse[]>> {
        const inventories = await this.httpClient.get<GenericResponse<InventoryResponse[]>>(
            '/api/inventory/find-in-stock',
        );

        return inventories;
    }

    async createInventory(config: {
        payload: BaseInventory;
    }): Promise<GenericResponse<InventoryResponse>> {
      
        const inventory = await this.httpClient.post<GenericResponse<InventoryResponse>>(
            '/api/inventory',
            config.payload,
        );

        return inventory;
    }

    async updateInventory(config: {
        query: string;
        payload: InventoryResponse;
    }): Promise<GenericResponse<InventoryResponse>> {
        const inventory = await this.httpClient.put<GenericResponse<InventoryResponse>>(
            '/api/inventory/' + config.query,
            config.payload,
        );

        return inventory;
    }

    async notification(config: {
        query: string;
       
    }): Promise<GenericResponse<boolean>> {
        const inventory = await this.httpClient.post<GenericResponse<boolean>>(
            '/api/inventory/notification/' + config.query,
        );

        return inventory;
    }
}

export const inventoryService = new InventoryService(httpClient);
