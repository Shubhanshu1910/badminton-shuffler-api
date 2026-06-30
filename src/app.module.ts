import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { PrismaModule } from '../database/prisma.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HealthModule } from './modules/health/health.module';
import { PlayerModule } from './modules/players/player.module';
import { CourtModule } from './modules/court/court.module';
import { SessionModule } from './modules/session/session.module';
import { GameModule } from './modules/game/game.module';
import { ShuffleModule } from './modules/shuffle/shuffle.module';
import { RoundModule } from './modules/round/round.module';
import { SocketModule } from './modules/socket/socket.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validationSchema: envValidationSchema,
      envFilePath: '.env',
    }),

    PrismaModule,

    HealthModule,

    PlayerModule,

    CourtModule,

    SessionModule,

    ShuffleModule,

    RoundModule,

    GameModule,

    SocketModule,

    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
