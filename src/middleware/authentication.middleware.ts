import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException();
    }
    next();
  }
}
