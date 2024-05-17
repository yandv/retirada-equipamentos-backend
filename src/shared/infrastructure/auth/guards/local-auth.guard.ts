import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Login } from '../dto/login.dto';
import { validate } from 'class-validator';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const body = plainToClass(Login, request.body);
    const errors = await validate(body);

    const errorMessages = errors.flatMap(({ constraints }) =>
      Object.values(constraints),
    );

    if (errorMessages.length > 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: errorMessages,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return super.canActivate(context) as boolean | Promise<boolean>;
  }

  handleRequest(err, user) {
    if (err || !user) {
      console.log(err, user);
      throw new HttpException(
        err?.message ?? 'Unauthorized',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
