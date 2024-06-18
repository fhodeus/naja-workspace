import type {
    BaseVeterinarian,
    GenericResponse,
    VeterinarianResponse,
} from '@endeavour/verification-integration';

import type HttpClient from './gateway/axios.adapter';
import { httpClient } from './gateway/axios.adapter';

class VeterinarianService {
    constructor(readonly httpClient: HttpClient) {}

    async getVeterinarians(config?: {
        params?: { name?: string };
    }): Promise<GenericResponse<VeterinarianResponse[]>> {
        const veterinarians = await this.httpClient.get<GenericResponse<VeterinarianResponse[]>>(
            '/api/veterinarians',
            { params: config?.params },
        );

        return veterinarians;
    }

    async getVeterinarian(id: string): Promise<GenericResponse<VeterinarianResponse>> {
        const veterinarians = await this.httpClient.get<GenericResponse<VeterinarianResponse>>(
            '/api/veterinarians/' + id,
        );

        return veterinarians;
    }

    async createVeterinarian(config: {
        payload: BaseVeterinarian;
    }): Promise<GenericResponse<VeterinarianResponse>> {
        const response = await this.httpClient.post<GenericResponse<VeterinarianResponse>>(
            '/api/veterinarians',
            config.payload,
        );

        return response;
    }

    async updateVeterinarian(config: {
        query: string;
        payload: BaseVeterinarian & { id: string };
    }): Promise<GenericResponse<VeterinarianResponse>> {
        const response = await this.httpClient.put<GenericResponse<VeterinarianResponse>>(
            '/api/veterinarians/' + config.query,
            config.payload,
        );

        return response;
    }
}

export const veterinarianService = new VeterinarianService(httpClient);
