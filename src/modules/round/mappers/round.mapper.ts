import { Round } from '@prisma/client';

export class RoundMapper {
  static toResponse(round: Round) {
    return {
      id: round.id,
      sessionId: round.sessionId,
      roundNumber: round.roundNumber,
      status: round.status,
      startedAt: round.startedAt,
      completedAt: round.completedAt,
      createdAt: round.createdAt,
    };
  }
}