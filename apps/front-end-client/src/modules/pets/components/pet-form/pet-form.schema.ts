import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { capitalizeSentence } from '../../../shared/utils/strings';

export const petSchema = () =>
    z.object({
        id: z.string(),
        name: z.string().min(1).max(100).transform(capitalizeSentence),
        age: z.number().gte(0),
        dob: z.string().min(1).max(100),
        breed: z.string().min(1).max(100),
        species: z.string().min(1).max(100),
        gender: z.string().min(1).max(100),
        weight: z.string().min(1).max(100),
        size: z.string().min(1).max(100),
        healthHistory: z.string().min(1).max(100),
        allergiesAndMedications: z.string().min(1).max(100),
        microchip: z.string().min(1).max(100),
        specialNotes: z.string().min(1).max(100),
        lastVisit: z.string().min(1).max(100),

        userId: z.string().min(1).max(100),
    });

export const registrationResolver = () => zodResolver(petSchema());

export type IPetSchema = z.infer<ReturnType<typeof petSchema>>;
