import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';

import { Messages } from '../constants/messages.constants';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';
import { ApiSuccessResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiSuccessResponse<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiSuccessResponse<T>> {
    const message =
      this.reflector.get<string>(
        RESPONSE_MESSAGE_KEY,
        context.getHandler(),
      ) ?? Messages.SUCCESS.FETCHED;

    return next.handle().pipe(
      map(
        (data): ApiSuccessResponse<T> => ({
          success: true,
          message,
          timestamp: new Date().toISOString(),
          data,
        }),
      ),
    );
  }
}
