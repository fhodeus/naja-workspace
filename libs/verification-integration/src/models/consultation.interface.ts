import type { DoseInventory } from './dose-inventory.interface';
import type { PetResponse } from './pets.interface';
import type { VeterinarianResponse } from './veterinarian.interface';

export interface BaseConsultation {
    id: string;

    day: string;

    startTime: string;
    endTime: string;

    petId: string;

    veterinarianId: string;
    status: string;
    reason: string;
    scheduleType: string;
}

export interface ConsultationResponse extends BaseConsultation {
    pet: PetResponse;
    veterinarian: VeterinarianResponse;
    doseInventory: DoseInventory[];

    notificationResponsible: boolean;
    notificationVetetinarian: boolean;

    anamneseContactants: string;
    anamneseFood: string;
    anamnesePrincipal: string;
    anamneseProgress: string;
    anamneseSpecial: string;
}
