import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';
import { ApiType } from 'src/axios/axios.apiType.enum';

@Injectable()
export class LotrService {
  constructor(private axiosService: AxiosService) {}

  async movies() {
    const movieResult = await this.axiosService.get(ApiType.lotr, 'movie');
    return movieResult.docs.filter(movie => movie.runtimeInMinutes < 300);
  }

  async movie(movieId: string) {
    return await this.axiosService.get(ApiType.lotr, `movie/${movieId}`);
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
