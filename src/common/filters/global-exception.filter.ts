import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { Messages } from '../constants/messages.constants';
import { ApiErrorResponse } from '../interfaces/api-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = Messages.ERROR.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = this.extractMessage(exception);
    }

    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    const errorResponse: ApiErrorResponse = {
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }

  private extractMessage(exception: HttpException): string {
    const error = exception.getResponse();

    if (typeof error === 'string') {
      return error;
    }

    if (typeof error === 'object' && error !== null) {
      const errorResponse = error as Record<string, unknown>;
      const rawMessage = errorResponse.message;

      if (Array.isArray(rawMessage)) {
        return rawMessage.join(', ');
      }

      if (typeof rawMessage === 'string') {
        return rawMessage;
      }
    }

    return Messages.ERROR.INTERNAL_SERVER_ERROR;
  }
}
