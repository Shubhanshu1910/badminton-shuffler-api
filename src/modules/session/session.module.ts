import { Module } from '@nestjs/common';

import { SessionController } from './controllers/session.controller';
import { SessionRepository } from './repositories/session.repository';
import { SessionService } from './services/session.service';
import { RoundService } from '../round/services/round.service';
import { RoundModule } from '../round/round.module';

@Module({
  imports: [RoundModule],
  controllers: [SessionController],
  providers: [
    SessionRepository,
    SessionService,
    
  ],
  exports: [SessionService],
})
export class SessionModule {}