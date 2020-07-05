import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { AnimalModule } from './animal/animal.module';
import { AuthenticateMiddleware } from './middleware/authentication.middleware';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, AnimalModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes('animal');
  }
}
