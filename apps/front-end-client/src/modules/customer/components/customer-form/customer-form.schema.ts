import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { capitalizeSentence } from '../../../shared/utils/strings';

export const profileSchema = () =>
    z.object({
        id: z.string(),
        fullName: z.string().min(1).max(100).transform(capitalizeSentence),
        email: z.string().min(1).max(255),
        address: z.string().min(1).max(255),
        telephone: z.string().min(1).max(100),
        dob: z.string().min(1).max(100),
        profession: z.string().max(100),
        medicalHistory: z.string(),
        document: z.string().min(1),
    });

export const registrationResolver = () => zodResolver(profileSchema());

export type ICustomerProfile = z.infer<ReturnType<typeof profileSchema>>;
