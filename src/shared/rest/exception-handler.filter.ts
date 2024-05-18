import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class ExceptionHandlerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorMessage = exception?.message ?? 'Internal Server Error';
    const exceptionClassName = exception.constructor.name;

    response.status(status).json({
      statusCode: status,
      data: {
        message: errorMessage,
        error: exceptionClassName,
      },
    });
  }
}
