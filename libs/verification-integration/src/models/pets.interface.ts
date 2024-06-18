import type { UserResponse } from './customer.interface';

export interface BasePet {
    name: string;

    age: number;

    dob: string;

    breed: string;

    species: string;

    gender: string;

    weight: string;

    size: string;

    healthHistory: string;

    allergiesAndMedications: string;

    microchip: string;

    specialNotes: string;

    lastVisit: string;
}

export interface PetResponse extends BasePet {
    id: string;

    user: UserResponse;

    userId: string;
    createAt: string;
}

export interface CreatePetBody extends BasePet {
    userId: string;
}
