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
} from 'routing-controllers';

import { PetNotFoundError } from '../errors/pet.errors';
import { Pet } from '../models/pet.model';
import { PetService } from '../services/pet.service';
import { Service } from 'typedi';
import { BasePet, CreatePetBody, GenericResponse } from '@endeavour/verification-integration';
import { DeleteResult } from 'typeorm';
import { ErrorHandlerMiddleware } from '../middlewares/error.middleware';

@Service()
@Authorized()
@UseAfter(ErrorHandlerMiddleware)
@JsonController('/pets')
export class PetController {
    constructor(private petService: PetService) {}

    @Get()
    public async find(): Promise<GenericResponse<Pet[]>> {
        const [pets] = await this.petService.find();
        return { content: pets };
    }

    @Get('/:id')
    @OnUndefined(PetNotFoundError)
    public async one(@Param('id') id: string): Promise<GenericResponse<Pet | undefined>> {
        const pet = await this.petService.findOne(id);
       
        return { content: pet };
    }

    @Post()
    public async create(
        @Body({ required: true }) body: CreatePetBody,
    ): Promise<GenericResponse<Pet>> {
        const pet = new Pet();

        pet.name = body.name;
        pet.age = body.age;
        pet.dob = body.dob;
        pet.breed = body.breed;
        pet.species = body.species;
        pet.gender = body.gender;
        pet.weight = body.weight;
        pet.size = body.size;
        pet.healthHistory = body.healthHistory;
        pet.allergiesAndMedications = body.allergiesAndMedications;
        pet.microchip = body.microchip;
        pet.specialNotes = body.specialNotes;
        pet.lastVisit = body.lastVisit;
        pet.userId = body.userId;

        const newPet = await this.petService.create(pet);
        return { content: newPet };
    }

    @Put('/:id')
    public async update(
        @Param('id') id: string,
        @Body() body: BasePet,
    ): Promise<GenericResponse<Pet>> {
        const pet = new Pet();

        pet.name = body.name;
        pet.age = body.age;
        pet.dob = body.dob;
        pet.breed = body.breed;
        pet.species = body.species;
        pet.gender = body.gender;
        pet.weight = body.weight;
        pet.size = body.size;
        pet.healthHistory = body.healthHistory;
        pet.allergiesAndMedications = body.allergiesAndMedications;
        pet.microchip = body.microchip;
        pet.specialNotes = body.specialNotes;
        pet.lastVisit = body.lastVisit;

        const updatedPet = await this.petService.update(id, pet);
        return { content: updatedPet };
    }

    @Delete('/:id')
    public async delete(@Param('id') id: string): Promise<GenericResponse<DeleteResult>> {
        const result = await this.petService.delete(id);
        return { content: result };
    }
}
