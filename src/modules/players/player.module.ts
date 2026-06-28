import { Module } from '@nestjs/common';

import { PlayerController } from './controllers/player.controller';
import { PlayerRepository } from './repositories/player.repository';
import { PlayerService } from './services/player.service';

@Module({
  controllers: [PlayerController],
  providers: [
    PlayerRepository,
    PlayerService,
  ],
  exports: [PlayerService],
})
export class PlayerModule {}