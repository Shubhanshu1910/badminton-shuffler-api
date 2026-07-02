import { Module } from '@nestjs/common';


import { RoundService } from './services/round.service';
import { RoundRepository } from './repositories/round.repository';
import { ShuffleModule } from '../shuffle/shuffle.module';
import { RoundController } from './controllers/round.controller';

@Module({
  imports: [ShuffleModule],
  controllers: [RoundController],
  providers: [
    RoundService,
    RoundRepository,
  ],
  exports: [RoundService],
})
export class RoundModule {}