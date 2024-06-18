import type { BaseUser, GenericResponse, UserResponse } from '@endeavour/verification-integration';

import type HttpClient from './gateway/axios.adapter';
import { httpClient } from './gateway/axios.adapter';

class CustomerService {
    constructor(readonly httpClient: HttpClient) {}

    async getAllCustomers(config?: {
        params?: { name?: string; document?: string };
    }): Promise<GenericResponse<UserResponse[]>> {
        const response = await this.httpClient.get<GenericResponse<UserResponse[]>>('/api/users', {
            params: config?.params,
        });

        return response;
    }

    async getCustomer(id: string): Promise<GenericResponse<UserResponse>> {
        const response = await this.httpClient.get<GenericResponse<UserResponse>>(
            '/api/users/' + id,
        );

        return response;
    }

    async createCustomer(config: { payload: BaseUser }): Promise<GenericResponse<UserResponse>> {
        const response = await this.httpClient.post<GenericResponse<UserResponse>>(
            '/api/users',
            config.payload,
        );

        return response;
    }

    async updateCustomer(config: {
        query: string;
        payload: BaseUser & { id: string };
    }): Promise<GenericResponse<UserResponse>> {
        const response = await this.httpClient.put<GenericResponse<UserResponse>>(
            '/api/users/' + config.query,
            config.payload,
        );

        return response;
    }

    async exportCustomer(config: { query: string }): Promise<GenericResponse<boolean>> {
        const response = await this.httpClient.post<GenericResponse<boolean>>(
            '/api/users/export/' + config.query,
        );

        return response;
    }
}

export const customerService = new CustomerService(httpClient);
