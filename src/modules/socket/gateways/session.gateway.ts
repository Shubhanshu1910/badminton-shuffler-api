import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { JoinSessionDto } from '../dto/join-session.dto';
import { LeaveSessionDto } from '../dto/leave-session.dto';
import { SocketEvents } from '../interfaces/socket-events.interface';
import { SocketService } from '../services/socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

afterInit() {
  this.socketService.setServer(this.server);
  console.log('Socket Server Ready');
}

  constructor(
    private readonly socketService: SocketService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Socket Connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Socket Disconnected: ${client.id}`);
  }

  @SubscribeMessage(SocketEvents.JOIN_SESSION)
  joinSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: JoinSessionDto,
  ) {
    client.join(dto.sessionId);

    this.socketService.addClient(
      dto.sessionId,
      client.id,
    );

    client.emit('joined', {
      sessionId: dto.sessionId,
    });
  }

  @SubscribeMessage(SocketEvents.LEAVE_SESSION)
  leaveSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: LeaveSessionDto,
  ) {
    client.leave(dto.sessionId);

    this.socketService.removeClient(
      dto.sessionId,
      client.id,
    );

    client.emit('left', {
      sessionId: dto.sessionId,
    });
  }
}