import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { capitalizeSentence } from '../../../shared/utils/strings';

export const profileSchema = () =>
    z.object({
        id: z.string(),
        fullName: z.string().min(1).max(100).transform(capitalizeSentence),
        email: z.string().min(1).max(100),
        address: z.string().min(1).max(100),
        telephone: z.string().min(1).max(100),
        dob: z.string().min(1).max(100),
        medicalHistory: z.string().min(1).max(100),
        professionalRecord: z.string().min(1).max(100),
        specialization: z.string().min(1).max(100),
    });

export const registrationResolver = () => zodResolver(profileSchema());

export type IVeterinarianProfile = z.infer<ReturnType<typeof profileSchema>>;
