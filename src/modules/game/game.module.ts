import { Module } from '@nestjs/common';

import { GameController } from './controllers/game.controller';
import { GameRepository } from './repositories/game.repository';
import { GameService } from './services/game.service';
import { SocketModule } from '../socket/socket.module';
import { RoundModule } from '../round/round.module';

@Module({
  imports: [RoundModule, SocketModule],
  controllers: [GameController],
  providers: [
    GameRepository,
    GameService,
  ],
  exports: [GameService],
})
export class GameModule {}