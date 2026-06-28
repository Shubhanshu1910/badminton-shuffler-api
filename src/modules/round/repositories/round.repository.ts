import { Injectable } from '@nestjs/common';
import {
  Match,
  MatchPlayer,
  Player,
  Round,
  SessionCourt,
  SessionPlayer,
} from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';


@Injectable()
export class RoundRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getLatestRound(sessionId: string): Promise<Round | null> {
    return this.prisma.round.findFirst({
      where: {
        sessionId,
      },
      orderBy: {
        roundNumber: 'desc',
      },
    });
  }

  async createRound(
    sessionId: string,
    roundNumber: number,
  ): Promise<Round> {
    return this.prisma.round.create({
      data: {
        session: {
          connect: {
            id: sessionId,
          },
        },
        roundNumber,
      },
    });
  }

  async getSessionPlayers(
    sessionId: string,
  ) {
    return this.prisma.sessionPlayer.findMany({
      where: {
        sessionId,
      },
      include: {
        player: true,
      },
    });
  }

  async getSessionCourts(
    sessionId: string,
  ) {
    return this.prisma.sessionCourt.findMany({
      where: {
        sessionId,
      },
      include: {
        court: true,
      },
      orderBy: {
        court: {
          courtNumber: 'asc',
        },
      },
    });
  }

  async createMatch(
    roundId: string,
    courtId: string,
  ): Promise<Match> {
    return this.prisma.match.create({
      data: {
        round: {
          connect: {
            id: roundId,
          },
        },
        court: {
          connect: {
            id: courtId,
          },
        },
      },
    });
  }

  async createMatchPlayers(
    matchId: string,
    teamA: string[],
    teamB: string[],
  ): Promise<void> {
    const data = [
      ...teamA.map((playerId, index) => ({
        playerId,
        matchId,
        team: 1,
        position: index + 1,
      })),
      ...teamB.map((playerId, index) => ({
        playerId,
        matchId,
        team: 2,
        position: index + 1,
      })),
    ];

    await this.prisma.matchPlayer.createMany({
      data,
    });
  }
}