import { Session } from '@prisma/client';

import { SessionResponseDto } from '../dto/session-response.dto';

export class SessionMapper {
  static toResponse(
    session: Session,
  ): SessionResponseDto {
    return {
      id: session.id,
      title: session.title,
      description: session.description ?? undefined,
      totalCourts: session.totalCourts,
      maxPlayers: session.maxPlayers,
      status: session.status,
      currentRound: session.currentRound,
      createdAt: session.createdAt,
    };
  }
}