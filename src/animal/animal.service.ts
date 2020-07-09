import { Injectable, BadRequestException } from '@nestjs/common';
import Axios from 'axios';
import faker from 'faker';
import { AnimalTypes } from './animal.types.enum';

@Injectable()
export class AnimalService {
  async getForAnimalType(animalType: AnimalTypes) {
    if (!Object.values(AnimalTypes).includes(animalType)) {
      throw new BadRequestException(
        `Animal type can be ${Object.values(AnimalTypes)}`,
      );
    }

    const response = await Axios.create().get(
      `https://cat-fact.herokuapp.com/facts?animal_type=${animalType}`,
    );

    return response.data.all.map(animal => {
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
