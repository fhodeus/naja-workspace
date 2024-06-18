import { Service } from 'typedi';
import { validate as uuidValidate } from 'uuid';

import type { Consultation } from '../models/consultation.model';
import { ConsultationRepository } from '../repositories/consultation.repositorie';
import { FindManyOptions } from 'typeorm';

@Service()
export class ConsultationService extends ConsultationRepository {
    public find(options?: FindManyOptions<Consultation>): Promise<[Consultation[], number]> {
        return this.consultationRepository.findAndCount({
            relations: ['pet', 'veterinarian', 'doseInventory'],
            cache: true,
            ...options,
        });
    }

    

    public findOne(id: string): Promise<Consultation> {
        if (!uuidValidate(id)) {
            return null;
        }
        return this.consultationRepository.findOne({
            where: { id },
            relations: ['pet', 'veterinarian', 'doseInventory'],
        });
    }

    public findAllByPet(petId: string): Promise<Consultation[]> {
        return this.consultationRepository.find({
            where: { petId },
            relations: ['pet', 'veterinarian', 'doseInventory'],
        });
    }

    public findAllByVeterinarian(veterinarianId: string): Promise<Consultation[]> {
        return this.consultationRepository.find({ where: { veterinarianId } });
    }

    public async create(consultation: Consultation): Promise<Consultation> {
        consultation.id = undefined;
        consultation.notificationResponsible = false;
        consultation.notificationVetetinarian = false;

        return this.consultationRepository.save(consultation);
    }

    public async update(id: string, consultation: Consultation): Promise<Consultation> {
        const currentConsultation = await this.consultationRepository.findOne({
            where: { id },
        });

        return this.consultationRepository.save({ ...currentConsultation, ...consultation });
    }

    public async delete(id: string): Promise<void> {
        await this.consultationRepository.delete(id);
        return;
    }
}
