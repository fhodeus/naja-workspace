import type {
    ConsultationResponse,
    Financial,
    FinancialResponse,
    GenericResponse,
    InventoryResponseViewModel,
    PetResponse,
} from '@endeavour/verification-integration';

import type HttpClient from './gateway/axios.adapter';
import { httpClient } from './gateway/axios.adapter';

class FinancialService {
    constructor(readonly httpClient: HttpClient) {}

    async getFinancials(): Promise<GenericResponse<FinancialResponse[]>> {
        const financials = await this.httpClient.get<GenericResponse<FinancialResponse[]>>(
            '/api/financial',
        );

        return financials;
    }

    async getFinancial(
        id: string,
    ): Promise<
        GenericResponse<{
            financial: Financial;
            consultations: ConsultationResponse[];
            newInventories: InventoryResponseViewModel[];
            newPets: PetResponse[];
        }>
    > {
        const financial = await this.httpClient.get<
            GenericResponse<{
                financial: Financial;
                consultations: ConsultationResponse[];
                newInventories: InventoryResponseViewModel[];
                newPets: PetResponse[];
            }>
        >('/api/financial/' + id);

        return financial;
    }

    async getConsultationsFinancial(id: string): Promise<GenericResponse<ConsultationResponse[]>> {
        const consultations = await this.httpClient.get<GenericResponse<ConsultationResponse[]>>(
            '/api/financial/consultations/' + id,
        );

        return consultations;
    }

    async getInventoriesFinancial(
        id: string,
    ): Promise<GenericResponse<InventoryResponseViewModel[]>> {
        const inventory = await this.httpClient.get<GenericResponse<InventoryResponseViewModel[]>>(
            '/api/financial/inventory/' + id,
        );

        return inventory;
    }

    async getPetsFinancial(id: string): Promise<GenericResponse<PetResponse[]>> {
        const pets = await this.httpClient.get<GenericResponse<PetResponse[]>>(
            '/api/financial/pets/' + id,
        );

        return pets;
    }

    async populate(): Promise<GenericResponse<Financial>> {
        const inventory = await this.httpClient.post<GenericResponse<Financial>>(
            '/api/financial/populate',
        );

        return inventory;
    }

    async faturar(id:string): Promise<GenericResponse<Financial>> {
        const inventory = await this.httpClient.post<GenericResponse<Financial>>(
            '/api/financial/faturar/' + id,
        );

        return inventory;
    }
}

export const financialService = new FinancialService(httpClient);
