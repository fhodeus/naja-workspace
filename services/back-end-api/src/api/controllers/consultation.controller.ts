import {
    JsonController,
    Get,
    Post,
    Param,
    Delete,
    Body,
    Authorized,
    UseAfter,
} from 'routing-controllers';
import { Service } from 'typedi';
import { Consultation } from '../models/consultation.model';
import { ConsultationService } from '../services/consultation.service';
import { BaseConsultation, GenericResponse } from '@endeavour/verification-integration';
import { DoseInventory } from '../models/dose-inventory.model';
import { DoseInventoryService } from '../services/dose-inventory.service';
import { mapResponseToDTO } from '../../lib/dto';
import { ErrorHandlerMiddleware } from '../middlewares/error.middleware';
import { ConsultationEmail } from '../services/email/consultation.email';
import { InventoryEmail } from '../services/email/inventory.email';

@Service()
@Authorized()
@UseAfter(ErrorHandlerMiddleware)
@JsonController('/consultations')
export class ConsultationController {
    constructor(
        private consultationRepository: ConsultationService,
        private doseInventoryService: DoseInventoryService,
        private consultationEmail: ConsultationEmail,
        private inventoryEmail: InventoryEmail,
    ) {}

    @Get()
    public async all(): Promise<GenericResponse<Consultation[]>> {
        const [consultations] = await this.consultationRepository.find();
        return { content: consultations };
    }

    @Get('/:id')
    public async one(@Param('id') id: string): Promise<GenericResponse<Consultation>> {
        const consultation = await this.consultationRepository.findOne(id);

        return { content: consultation };
    }

    @Get('/find-by-pet/:id')
    public async allByPet(@Param('id') id: string): Promise<GenericResponse<Consultation[]>> {
        const consultations = await this.consultationRepository.findAllByPet(id);
        return { content: consultations };
    }

    @Get('/find-by-veterinarian/:id')
    public async allByVeterinarian(
        @Param('id') id: string,
    ): Promise<GenericResponse<Consultation[]>> {
        const consultations = await this.consultationRepository.findAllByVeterinarian(id);
        return { content: consultations };
    }

    @Post()
    async create(@Body() body: BaseConsultation): Promise<GenericResponse<Consultation>> {
        const consultation = mapResponseToDTO<Consultation, typeof body>(body);

        const createdConsultation = await this.consultationRepository.create(consultation);

        this.consultationEmail.sendConsultationNotification(
            createdConsultation.id,
            'Consulta Criada',
        );

        return { content: createdConsultation };
    }

    @Post('/:id')
    public async update(
        @Param('id') id: string,
        @Body({ validate: false }) body: Consultation,
    ): Promise<GenericResponse<Consultation>> {
        try {
            const doseInventory = body.doseInventory;
            body.doseInventory = undefined;
            const updatedConsultation = await this.consultationRepository.update(id, { ...body });
            console.log('aqui foi');
            const promiseArray = doseInventory.map((dose: DoseInventory) => {
                return new Promise<void>(async (resolve, reject) => {
                    const newDoseInventory = new DoseInventory();
                    newDoseInventory.id = dose.id;
                    newDoseInventory.lote = dose.lote;
                    newDoseInventory.consultationId = updatedConsultation.id;

                    const DoseInventoryCreated = await this.doseInventoryService.update(
                        dose.id,
                        newDoseInventory,
                    );

                    if (DoseInventoryCreated) {
                        console.log('resolveu');
                        resolve();
                    } else {
                        console.log('rejeitou');
                        reject();
                    }
                });
            });

            await Promise.all(promiseArray);
            this.consultationEmail.sendConsultationNotification(
                updatedConsultation.id,
                'Consulta Alterada',
            );

            this.inventoryEmail.findOutStockNotification();

            const updatedFindedConsultation = await this.consultationRepository.findOne(
                updatedConsultation.id,
            );
            return { content: updatedFindedConsultation };
        } catch (error) {
            console.log(error);
        }

        const updatedFindedConsultation = await this.consultationRepository.findOne(id);
        return { content: updatedFindedConsultation };
    }

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.consultationRepository.delete(id);
    }
}
