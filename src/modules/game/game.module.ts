import { Module } from '@nestjs/common';

import { GameController } from './controllers/game.controller';
import { GameRepository } from './repositories/game.repository';
import { GameService } from './services/game.service';

@Module({
  controllers: [GameController],
  providers: [
    GameRepository,
    GameService,
  ],
  exports: [GameService],
})
export class GameModule {}