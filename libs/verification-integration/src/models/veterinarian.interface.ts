import type { ConsultationResponse } from "./consultation.interface";

export interface BaseVeterinarian {
    fullName: string;

    email: string;

    address: string;

    telephone: string;

    bod: string;

    medicalHistory: string;

    professionalRecord: string;

    specialization: string;
}

export interface VeterinarianResponse extends BaseVeterinarian {
    id: string;
    consultations: ConsultationResponse[];
}
