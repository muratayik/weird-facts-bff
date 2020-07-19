import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';
import { ApiType } from 'src/axios/axios.apiType.enum';
import faker from 'faker';

@Injectable()
export class LotrService {
  constructor(private axiosService: AxiosService) {}

  async movies() {
    const movieResult = await this.axiosService.get(ApiType.lotr, 'movie');
    const moviesThatAreNotBundled = movieResult.docs.filter(
      movie => movie.runtimeInMinutes < 300,
    );
    return moviesThatAreNotBundled.map(movie => {
      const {
        _id,
        name,
        runtimeInMinutes,
        budgetInMillions,
        boxOfficeRevenueInMillions,
        academyAwardNominations,
        academyAwardWins,
      } = movie;
      return {
        _id,
        name,
        runtimeInMinutes,
        budgetInMillions,
        boxOfficeRevenueInMillions,
        academyAwardNominations,
        academyAwardWins,
        imagePath: faker.image.avatar(),
      };
    });
  }

  async movie(movieId: string) {
    const selectedMovie = await this.axiosService.get(
      ApiType.lotr,
      `movie/${movieId}`,
    );
    if (!selectedMovie) {
      throw new NotFoundException();
    }

    return selectedMovie;
  }

  async characters() {
    return (await this.axiosService.get(ApiType.lotr, 'character')).docs;
  }

  async character(characterId: string) {
    return await this.axiosService.get(
      ApiType.lotr,
      `character/${characterId}`,
    );
  }

  async charactersOfMovie(movieId: string) {
    const quotesOfMovie = await this.quotesOfMovie(movieId);
    if (!quotesOfMovie || !quotesOfMovie.length) return [];

    const allCharacters = await this.characters();
    const characterIds = Array.from(
      new Set(quotesOfMovie.map(quote => quote.character)),
    );

    return characterIds.map(characterId =>
      allCharacters.find(char => char._id === characterId),
    );
  }

  async quotes() {
    return (await this.axiosService.get(ApiType.lotr, 'quote')).docs;
  }

  async quotesOfMovie(movieId: string) {
    return (await this.axiosService.get(ApiType.lotr, `movie/${movieId}/quote`))
      .docs;
  }

  async quotesOfCharacterInMovie(movieId: string, characterId: string) {
    const movie = await this.movie(movieId);
    const character = await this.character(characterId);
    const quotes = (await this.quotes())
      .filter(quote => quote.movie === movieId)
      .filter(quote => quote.character === characterId);
    return {
      movie,
      character,
      quotes,
    };
  }
}
