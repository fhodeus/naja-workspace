import {
    Body,
    Delete,
    Get,
    OnUndefined,
    Param,
    Post,
    Put,
    JsonController,
    Authorized,
    UseAfter,
    QueryParams,
} from 'routing-controllers';

import { PetNotFoundError } from '../errors/pet.errors';
import { Service } from 'typedi';
import { VeterinarianService } from '../services/veterinarian.service';
import { Veterinarian } from '../models/veterinarian.model';
import { GenericResponse } from '@endeavour/verification-integration';
import { ErrorHandlerMiddleware } from '../middlewares/error.middleware';
import { CustomerKeycloakService } from '../services/keycloak/user.service';

class BaseVeterinarian {
    public fullName: string;

    public email: string;

    public address: string;

    public telephone: string;

    public bod: string;

    public medicalHistory: string;

    public professionalRecord: string;

    public specialization: string;
}

export class VeterinarianResponse extends BaseVeterinarian {
    public id: string;
}

@Service()
@Authorized()
@UseAfter(ErrorHandlerMiddleware)
@JsonController('/veterinarians')
export class PetController {
    constructor(
        private veterinarianService: VeterinarianService,
        private customerKeycloakService: CustomerKeycloakService,
    ) {}

    @Get()
    public async find(
        @QueryParams({ required: false, validate: false }) query?: { name?: string },
    ): Promise<GenericResponse<Veterinarian[]>> {
        const veterinariansList = await this.veterinarianService.find(query?.name);
        return { content: veterinariansList };
    }

    @Get('/:id')
    @OnUndefined(PetNotFoundError)
    public async one(@Param('id') id: string): Promise<GenericResponse<Veterinarian | undefined>> {
        const veterinarian = await this.veterinarianService.findOne(id);
        return { content: veterinarian };
    }

    @Post()
    public async create(
        @Body({ required: true }) body: BaseVeterinarian,
    ): Promise<GenericResponse<Veterinarian>> {
        const veterinarian = new Veterinarian();

        veterinarian.fullName = body.fullName;
        veterinarian.email = body.email;
        veterinarian.address = body.address;
        veterinarian.telephone = body.telephone;
        veterinarian.bod = body.bod;
        veterinarian.medicalHistory = body.medicalHistory;
        veterinarian.professionalRecord = body.professionalRecord;
        veterinarian.specialization = body.specialization;

        const newVeterianrian = await this.veterinarianService.create(veterinarian);

        await this.customerKeycloakService.createUser({
            payload: {
                username: newVeterianrian.email,
                enabled: true,
                emailVerified: true,
                firstName: newVeterianrian.fullName,
                lastName: newVeterianrian.fullName,
                email: newVeterianrian.email,
                groups: [],
                attributes: undefined,
                credentials: [
                    {
                        type: 'password',
                        value: 'vet@123',
                        temporary: true,
                    },
                ],
            },
        });

        return { content: newVeterianrian };
    }

    @Put('/:id')
    public async update(
        @Param('id') id: string,
        @Body() body: BaseVeterinarian,
    ): Promise<GenericResponse<Veterinarian>> {
        const veterinarian = new Veterinarian();

        veterinarian.fullName = body.fullName;
        veterinarian.email = body.email;
        veterinarian.address = body.address;
        veterinarian.telephone = body.telephone;
        veterinarian.bod = body.bod;
        veterinarian.medicalHistory = body.medicalHistory;
        veterinarian.professionalRecord = body.professionalRecord;
        veterinarian.specialization = body.specialization;

        const updatedVeterinarian = await this.veterinarianService.update(id, veterinarian);
        return { content: updatedVeterinarian };
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.veterinarianService.delete(id);
    }
}
