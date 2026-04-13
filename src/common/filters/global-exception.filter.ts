import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    let detail: string | null = null;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      message = typeof res === 'object' ? (res as any).message : res;
    } else if (exception instanceof Error) {
      message = exception.message;
      detail = exception.stack || null;
    }

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      detail: process.env.NODE_ENV === 'production' ? null : detail || null,
    };

    console.error(
      `[GlobalExceptionFilter] ${request.method} ${request.url}`,
      exception,
    );

    response.status(status).json(responseBody);
  }
}
