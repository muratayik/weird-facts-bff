import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { AuthModule } from '../auth/auth.module';
import { AxiosModule } from '../axios/axios.module';

@Module({
  imports: [AuthModule, AxiosModule],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule {}
