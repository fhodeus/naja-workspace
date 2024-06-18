import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const consultationSchema = () =>
    z
        .object({
            id: z.string(),
            veterinarianId: z.string().min(1).max(100),
            petId: z.string().min(1).max(100),
            startTime: z.string().min(1).max(100),
            endTime: z.string().min(1).max(100),
            day: z.string().min(1).max(100),
            doseInventory: z.array(
                z.object({
                    id: z.string(),
                    lote: z.string(),
                    name: z.string().optional(),
                    consultationId: z.string().optional(),
                }),
            ),
            scheduleType: z.string(),
            status: z.string(),
            reason: z.string(),

            anamneseContactants: z.string().min(0).max(255),
            anamneseFood: z.string().min(0).max(255),
            anamnesePrincipal: z.string().min(0).max(255),
            anamneseProgress: z.string().min(0).max(255),
            anamneseSpecial: z.string().min(0).max(255),
        })
        .refine(
            (data) => {
                const start = new Date(`2000-01-01T${data.startTime}`);
                const end = new Date(`2000-01-01T${data.endTime}`);
                
                // Garante que startTime seja maior que endTime
                if (start >= end) {
                  return false;
                }
                // Garante que a diferença entre startTime e endTime seja de pelo menos uma hora
                if (end.getTime() - start.getTime() < 60 * 60 * 1000) {
                  
                    return false;
                }
                return true;
            },
            {
                // Mensagem de erro personalizada
                message: 'O tempo minimo entre o inicio e o fim deve ser superior a uma hora.',
                path: ['endTime']
            },
        );

export const registrationResolver = () => zodResolver(consultationSchema());

export type IConsultationSchema = z.infer<ReturnType<typeof consultationSchema>>;
