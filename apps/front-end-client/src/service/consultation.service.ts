import type {
    BaseConsultation,
    ConsultationResponse,
    GenericResponse,
} from '@endeavour/verification-integration';

import type HttpClient from './gateway/axios.adapter';
import { httpClient } from './gateway/axios.adapter';

class ConsultationService {
    constructor(readonly httpClient: HttpClient) {}

    async getConsultations(): Promise<GenericResponse<BaseConsultation[]>> {
        const consultations = await this.httpClient.get<GenericResponse<BaseConsultation[]>>(
            '/api/consultations',
        );

        return consultations;
    }

    async getConsultation(id: string): Promise<GenericResponse<ConsultationResponse>> {
        const consultations = await this.httpClient.get<GenericResponse<ConsultationResponse>>(
            '/api/consultations/' + id,
        );

        return consultations;
    }

    async createConsultation(config: {
        payload: BaseConsultation;
    }): Promise<GenericResponse<BaseConsultation>> {
        const consultations = await this.httpClient.post<GenericResponse<BaseConsultation>>(
            '/api/consultations',
            config.payload,
        );

        return consultations;
    }

    async updateConsultation(config: {
        query: string;
        payload: BaseConsultation;
    }): Promise<GenericResponse<ConsultationResponse>> {
        const consultations = await this.httpClient.post<GenericResponse<ConsultationResponse>>(
            '/api/consultations/' + config.query,
            config.payload,
        );

        return consultations;
    }

    async getConsultationsByPet(id: string): Promise<GenericResponse<ConsultationResponse[]>> {
        const consultations = await this.httpClient.get<GenericResponse<ConsultationResponse[]>>(
            '/api/consultations/find-by-pet/' + id,
        );

        return consultations;
    }

    async getConsultationsByVeterinarian(
        id: string,
    ): Promise<GenericResponse<ConsultationResponse[]>> {
        const consultations = await this.httpClient.get<GenericResponse<ConsultationResponse[]>>(
            '/api/consultations/find-by-veterinarian/' + id,
        );

        return consultations;
    }
}

export const consultationService = new ConsultationService(httpClient);
