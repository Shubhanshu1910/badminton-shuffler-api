import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly rooms = new Map<string, Set<string>>();
  private server: Server;
  
setServer(server: Server) {
    this.server = server;
  }

  emitToSession(
    sessionId: string,
    event: string,
    payload: unknown,
  ) {
    this.server
      ?.to(sessionId)
      .emit(event, payload);
  }

  emitToAll(
    event: string,
    payload: unknown,
  ) {
    this.server?.emit(event, payload);
  }

  addClient(sessionId: string, socketId: string) {
    if (!this.rooms.has(sessionId)) {
      this.rooms.set(sessionId, new Set());
    }

    this.rooms.get(sessionId)?.add(socketId);
  }

  removeClient(sessionId: string, socketId: string) {
    const room = this.rooms.get(sessionId);

    if (!room) {
      return;
    }

    room.delete(socketId);

    if (room.size === 0) {
      this.rooms.delete(sessionId);
    }
  }

  getClients(sessionId: string) {
    return [...(this.rooms.get(sessionId) ?? [])];
  }

  roomExists(sessionId: string) {
    return this.rooms.has(sessionId);
  }
}