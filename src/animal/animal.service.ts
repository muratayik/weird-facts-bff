import { Injectable, BadRequestException } from '@nestjs/common';
import faker from 'faker';
import { AnimalTypes } from './animal.types.enum';
import { AxiosService } from '../axios/axios.service';
import { ApiType } from '../axios/axios.apiType.enum';

@Injectable()
export class AnimalService {
  constructor(private axiosService: AxiosService) {}

  async getForAnimalType(animalType: AnimalTypes) {
    if (!Object.values(AnimalTypes).includes(animalType)) {
      throw new BadRequestException(
        `Animal type can be ${Object.values(AnimalTypes)}`,
      );
    }

    const response = await this.axiosService.get(
      ApiType.animal,
      `facts?animal_type=${animalType}`,
    );

    return response.all.map(animal => {
      const { _id, text, type } = animal;
      return {
        _id,
        text,
        type,
        userName: faker.name.findName(),
        avatar: faker.image.avatar(),
        postingDate: faker.date.past().toDateString(),
      };
    });
  }
}
