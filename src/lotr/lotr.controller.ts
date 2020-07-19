import { Controller, Get, Param } from '@nestjs/common';
import { LotrService } from './lotr.service';

@Controller('lotr')
export class LotrController {
  constructor(private lotrService: LotrService) {}

  @Get('movies')
  async movies() {
    return await this.lotrService.movies();
  }

  @Get('movies/:movieId')
  async movie(@Param('movieId') movieId: string) {
    return await this.lotrService.movie(movieId);
  }

  @Get('characters')
  async characters() {
    return await this.lotrService.characters();
  }

  @Get('characters/:movieId')
  async charactersOfMovie(@Param('movieId') movieId: string) {
    return await this.lotrService.charactersOfMovie(movieId);
  }

  @Get('quotes')
  async quotes() {
    return await this.lotrService.quotes();
  }

  @Get('quotes/:movieId/:characterId')
  async quotesOfCharacterInMovie(
    @Param('movieId') movieId: string,
    @Param('characterId') characterId: string,
  ) {
    return await this.lotrService.quotesOfCharacterInMovie(
      movieId,
      characterId,
    );
  }
}
