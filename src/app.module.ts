import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { PrismaModule } from '../database/prisma.module';
import { HealthModule } from './modules/health/heath.module';
import { PlayerModule } from './modules/players/player.module';
import { CourtModule } from './modules/court/court.module';
import { SessionModule } from './modules/session/session.module';

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

    SessionModule
  ],
})
export class AppModule {}