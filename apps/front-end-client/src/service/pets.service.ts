import type {
    CreatePetBody,
    GenericResponse,
    PetResponse,
} from '@endeavour/verification-integration';

import type HttpClient from './gateway/axios.adapter';
import { httpClient } from './gateway/axios.adapter';

class PetService {
    constructor(readonly httpClient: HttpClient) {}

    async getPets(): Promise<PetResponse[]> {
        const pets = await this.httpClient.get<PetResponse[]>('/api/pets');
        return pets;
    }

    async getPet(id: string): Promise<GenericResponse<PetResponse>> {
        const pet = await this.httpClient.get<GenericResponse<PetResponse>>('/api/pets/' + id);
        return pet;
    }

    async createPet(config: { payload: CreatePetBody }): Promise<GenericResponse<CreatePetBody>> {
        const petCreated = await this.httpClient.post<GenericResponse<CreatePetBody>>(
            '/api/pets',
            config.payload,
        );
        return petCreated;
    }

    async updatePet(config: {
        query: string;
        payload: CreatePetBody & { id: string };
    }): Promise<GenericResponse<CreatePetBody>> {
        const petUpdated = await this.httpClient.put<GenericResponse<CreatePetBody>>(
            `/api/pets/${config.query}`,
            config.payload,
        );
        return petUpdated;
    }

    async removePet(id: string): Promise<void> {
        await this.httpClient.delete(`/api/pets/${id}`);
    }
}

export const petService = new PetService(httpClient);
