import { Module } from '@nestjs/common';

import { SessionController } from './controllers/session.controller';
import { SessionRepository } from './repositories/session.repository';
import { SessionService } from './services/session.service';
import { RoundModule } from '../round/round.module';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [RoundModule, SocketModule],
  controllers: [SessionController],
  providers: [SessionRepository, SessionService],
  exports: [SessionService],
})
export class SessionModule {}