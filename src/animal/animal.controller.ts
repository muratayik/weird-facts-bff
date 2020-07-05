import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalTypes } from './animal.types.enum';

@Controller('animal')
export class AnimalController {
  constructor(private animalService: AnimalService) {}

  @Get('/:animalType')
  async getForAnimal(@Param('animalType') animalType: AnimalTypes) {
    return this.animalService.getForAnimalType(animalType);
  }
}
