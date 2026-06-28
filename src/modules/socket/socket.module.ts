import { Module } from '@nestjs/common';

import { SessionGateway } from './gateways/session.gateway';
import { SocketService } from './services/socket.service';

@Module({
  providers: [SessionGateway, SocketService],
  exports: [SessionGateway, SocketService],
})
export class SocketModule {}
