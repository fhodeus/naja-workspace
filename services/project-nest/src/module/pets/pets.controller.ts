import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetsService } from './pets.service';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from 'src/database/entities/pet.entity';

@Controller('pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    @Post()
    create(@Body() createPetDto: Pet) {
        return this.petsService.create(createPetDto);
    }

    @Get()
    findAll() {
        return this.petsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.petsService.findById(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
        return this.petsService.update(+id, updatePetDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.petsService.delete(+id);
    }
}
