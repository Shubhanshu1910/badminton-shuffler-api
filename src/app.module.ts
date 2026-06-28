import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { PrismaModule } from '../database/prisma.module';
import { HealthModule } from './modules/health/heath.module';
import { PlayerModule } from './modules/players/player.module';
import { CourtModule } from './modules/court/court.module';
import { SessionModule } from './modules/session/session.module';
import { GameModule } from './modules/game/game.module';
import { ShuffleModule } from './modules/shuffle/shuffle.module';
import { RoundModule } from './modules/round/round.module';

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

    GameModule
  ],
})
export class AppModule {}