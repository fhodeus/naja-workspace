import type { PetResponse } from './pets.interface';

export interface BaseUser {
    fullName: string;

    email: string;

    address: string;

    telephone: string;

    bod: string;
    profession: string;

    medicalHistory: string;
    document:string;
}

export interface UserResponse extends BaseUser {
    id: string;

    pets: PetResponse[];
    creataAt:string;
}

export interface CreateUserBody extends BaseUser {}
