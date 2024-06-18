import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const consultationSchema = () =>
    z.object({
        id: z.string(),
        veterinarianId: z.string().min(1).max(100),
        petId: z.string().min(1).max(100),
        startTime: z.string().min(1).max(100),
        endTime: z.string().min(1).max(100),
        day: z.string().min(1).max(100),
    })
    .refine(data => {
        
        const start = new Date(`2000-01-01T${data.startTime}`);
        const end = new Date(`2000-01-01T${data.endTime}`);
        console.log(data);
        // Garante que startTime seja maior que endTime
        if (start <= end) {
            throw new Error('startTime deve ser maior que endTime');
        }
        // Garante que a diferença entre startTime e endTime seja de pelo menos uma hora
        if (end.getTime() - start.getTime() < 60 * 60 * 1000) {
            throw new Error('A diferença entre startTime e endTime deve ser de pelo menos uma hora');
        }
        return true;
    }, {
        // Mensagem de erro personalizada
        message: 'Dados de consulta inválidos',
        path: ['endTime']
    });
export const registrationResolver = () => zodResolver(consultationSchema());

export type IConsultationSchema = z.infer<ReturnType<typeof consultationSchema>>;
