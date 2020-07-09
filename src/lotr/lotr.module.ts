import { Module } from '@nestjs/common';
import { LotrController } from './lotr.controller';
import { LotrService } from './lotr.service';
import { AxiosModule } from '../axios/axios.module';

@Module({
  imports: [AxiosModule],
  controllers: [LotrController],
  providers: [LotrService],
})
export class LotrModule {}
