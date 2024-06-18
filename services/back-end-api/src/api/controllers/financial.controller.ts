import {
    JsonController,
    Get,
    OnUndefined,
    Param,
    Post,
    Authorized,
    UseAfter,
} from 'routing-controllers';
import { UserNotFoundError } from '../errors/user.errors';
import { Service } from 'typedi';
import {
    FinancialResponse,
    GenericResponse,
    InventoryResponseViewModel,
} from '@endeavour/verification-integration';
import { ErrorHandlerMiddleware } from '../middlewares/error.middleware';
import { FinancialService } from '../services/financial.service';
import { Financial } from '../models/financial.model';
import { ConsultationService } from '../services/consultation.service';
import { Consultation } from '../models/consultation.model';
import { And, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { InventoryService } from '../services/inventory.service';
import { PetService } from '../services/pet.service';
import { Pet } from '../models/pet.model';
import { EmailService } from '../services/email/gateway/email.adapter';
import { json2csv } from 'json-2-csv';

@Service()
@Authorized()
@UseAfter(ErrorHandlerMiddleware)
@JsonController('/financial')
export class UserController {
    constructor(
        private financialRepository: FinancialService,
        private consultationRepository: ConsultationService,
        private inventoryRepository: InventoryService,
        private emailService: EmailService,
        private petService: PetService,
    ) {}

    @Get()
    public async find(): Promise<GenericResponse<FinancialResponse[]>> {
        const financials = await this.financialRepository.find();

        const financialsCountedPromisse = financials.map(async (financial) => {
            const [_newPets, count] = await this.petService.find({
                relations: [],
                where: {
                    createAt: And(
                        MoreThanOrEqual(financial.startTime),
                        LessThanOrEqual(financial.endTime),
                    ),
                },
            });

            const [_consultations, countConsultations] = await this.consultationRepository.find({
                relations: [],
                where: {
                    day: And(
                        MoreThanOrEqual(financial.startTime),
                        LessThanOrEqual(financial.endTime),
                    ),
                },
            });

            return {
                ...financial,
                newPetsCount: count,
                consultationsCount: countConsultations,
            };
        });

        const financialsCounted = await Promise.all(financialsCountedPromisse);

        const orderedFinancials = financialsCounted.sort(
            (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
        );

        return { content: orderedFinancials };
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public async one(@Param('id') id: string): Promise<
        GenericResponse<
            | {
                  financial: Financial;
                  consultations: Consultation[];
                  newInventories: InventoryResponseViewModel[];
                  newPets: Pet[];
              }
            | undefined
        >
    > {
        const financial = await this.financialRepository.findOne(id);

        if (!financial) {
            return null;
        }

        const consultations = this.consultationRepository.find({
            where: {
                day: And(MoreThanOrEqual(financial.startTime), LessThanOrEqual(financial.endTime)),
            },
        });

        const inventoryListPromisse = this.inventoryRepository.find({
            where: {
                createdAt: And(
                    MoreThanOrEqual(financial.startTime),
                    LessThanOrEqual(financial.endTime),
                ),
            },
        });

        const [newPets] = await this.petService.find({
            where: {
                createAt: And(
                    MoreThanOrEqual(financial.startTime),
                    LessThanOrEqual(financial.endTime),
                ),
            },
        });

        const inventoryList = await inventoryListPromisse;

        const newInventories: InventoryResponseViewModel[] = inventoryList.map((inventory) => {
            return {
                ...inventory,
                used: inventory.doseInventory.filter((e) => !!e.consultationId).length,
            };
        });

        const [consultationsMounth] = await consultations;

        return {
            content: {
                financial,
                consultations: consultationsMounth,
                newInventories,
                newPets,
            },
        };
    }

    @Get('/consultations/:id')
    public async consultationsInFinancial(
        @Param('id') id: string,
    ): Promise<GenericResponse<Consultation[]>> {
        const financial = await this.financialRepository.findOne(id);

        const [consultations] = await this.consultationRepository.find({
            where: {
                day: And(MoreThanOrEqual(financial.startTime), LessThanOrEqual(financial.endTime)),
            },
        });

        return { content: consultations };
    }

    @Get('/inventory/:id')
    public async inventoryInFinancial(
        @Param('id') id: string,
    ): Promise<GenericResponse<InventoryResponseViewModel[]>> {
        const financial = await this.financialRepository.findOne(id);

        const inventoryList = await this.inventoryRepository.find({
            where: {
                createdAt: And(
                    MoreThanOrEqual(financial.startTime),
                    LessThanOrEqual(financial.endTime),
                ),
            },
        });

        const inventoryViewModel: InventoryResponseViewModel[] = inventoryList.map((inventory) => {
            return {
                ...inventory,
                used: inventory.doseInventory.filter((e) => !!e.consultationId).length,
            };
        });

        return { content: inventoryViewModel };
    }

    @Get('/pets/:id')
    public async petsInFinancial(@Param('id') id: string): Promise<GenericResponse<Pet[]>> {
        const financial = await this.financialRepository.findOne(id);

        const [pets] = await this.petService.find({
            where: {
                createAt: And(
                    MoreThanOrEqual(financial.startTime),
                    LessThanOrEqual(financial.endTime),
                ),
            },
        });
        return { content: pets };
    }

    @Post('/faturar/:id')
    public async faturarFinancial(@Param('id') id: string): Promise<GenericResponse<Financial>> {
        const financial = await this.financialRepository.findOne(id);

        if (!financial) {
            return null;
        }

        financial.status = 'faturado';

        const updatedFinancial = await this.financialRepository.update(financial.id, financial);

        const inventoryList = await this.inventoryRepository.find({
            where: {
                createdAt: And(
                    MoreThanOrEqual(updatedFinancial.startTime),
                    LessThanOrEqual(updatedFinancial.endTime),
                ),
            },
            relations: [],
        });

        const [consultations] = await this.consultationRepository.find({
            where: {
                day: And(MoreThanOrEqual(financial.startTime), LessThanOrEqual(financial.endTime)),
            },
            relations:[]
        });

        const [pets] = await this.petService.find({
            where: {
                createAt: And(
                    MoreThanOrEqual(financial.startTime),
                    LessThanOrEqual(financial.endTime),
                ),
            },
            relations:[]
        });

        this.emailService.sendEmail(
            ['bxnandoxd@edu.unifil.br'],
            'Balanço Faturado',
            `Mes de referencia ${updatedFinancial.month}`,
            [
                {
                    filename: `Entradas-no-Estoque-${updatedFinancial.month}.csv`,
                    content: json2csv(inventoryList),
                },
                {
                    filename: `Pacientes-registrado-no-periodo-${updatedFinancial.month}.csv`,
                    content: json2csv(pets),
                },
                {
                    filename: `Consultas-no-Mes-${updatedFinancial.month}.csv`,
                    content: json2csv(consultations),
                },
            ],
        );

        return { content: updatedFinancial };
    }

    @Post('/populate')
    public async populate(): Promise<object> {
        const financialData: {
            month: string;
            startTime: string;
            endTime: string;
        }[] = [
            {
                month: 'Janeiro',
                startTime: '2024-01-01 00:00:00',
                endTime: '2024-01-31 23:59:59',
            },
            {
                month: 'Fevereiro',
                startTime: '2024-02-01 00:00:00',
                endTime: '2024-02-29 23:59:59',
            },
            {
                month: 'Março',
                startTime: '2024-03-01 00:00:00',
                endTime: '2024-03-31 23:59:59',
            },
            {
                month: 'Abril',
                startTime: '2024-04-01 00:00:00',
                endTime: '2024-04-30 23:59:59',
            },
            {
                month: 'Maio',
                startTime: '2024-05-01 00:00:00',
                endTime: '2024-05-31 23:59:59',
            },
            {
                month: 'Junho',
                startTime: '2024-06-01 00:00:00',
                endTime: '2024-06-30 23:59:59',
            },
            {
                month: 'Julho',
                startTime: '2024-07-01 00:00:00',
                endTime: '2024-07-31 23:59:59',
            },
            {
                month: 'Agosto',
                startTime: '2024-08-01 00:00:00',
                endTime: '2024-08-31 23:59:59',
            },
            {
                month: 'Setembro',
                startTime: '2024-09-01 00:00:00',
                endTime: '2024-09-30 23:59:59',
            },
            {
                month: 'Outubro',
                startTime: '2024-10-01 00:00:00',
                endTime: '2024-10-31 23:59:59',
            },
            {
                month: 'Novembro',
                startTime: '2024-11-01 00:00:00',
                endTime: '2024-11-30 23:59:59',
            },
            {
                month: 'Dezembro',
                startTime: '2024-12-01 00:00:00',
                endTime: '2024-12-31 23:59:59',
            },
        ];

        const financialReportPromises = financialData.map((financial) =>
            this.financialRepository.populate(financial as Financial),
        );

        await Promise.all(financialReportPromises);
        return { message: 'Todos os dados financeiros foram populados com sucesso.' };
    }
}
