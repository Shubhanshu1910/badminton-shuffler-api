import { Match } from '@prisma/client';

export class GameMapper {
  static toResponse(match: Match) {
    return {
      id: match.id,
      status: match.status,
      teamAScore: match.teamAScore,
      teamBScore: match.teamBScore,
      winner: match.winner,
      startedAt: match.startedAt,
      endedAt: match.endedAt,
    };
  }
}