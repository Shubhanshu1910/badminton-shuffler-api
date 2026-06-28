export interface SocketUser {
  socketId: string;

  sessionId: string;

  userName?: string;

  isHost?: boolean;
}