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

  async getCurrentRound(sessionId: string) {
  return this.prisma.round.findFirst({
    where: {
      sessionId,
    },
    orderBy: {
      roundNumber: 'desc',
    },
    include: {
      matches: {
        include: {
          court: true,
          players: {
            include: {
              player: true,
            },
          },
        },
      },
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

  async getSessionById(sessionId: string) {
    return this.prisma.session.findUnique({
      where: { id: sessionId },
    });
  }

  async getActivePlayerIdsInRound(roundId: string): Promise<Set<string>> {
    const matches = await this.prisma.match.findMany({
      where: {
        roundId,
        status: {
          in: ['PENDING', 'PLAYING'],
        },
      },
      include: {
        players: true,
      },
    });

    const ids = new Set<string>();
    for (const match of matches) {
      for (const mp of match.players) {
        ids.add(mp.playerId);
      }
    }
    return ids;
  }

  async buildPartnerHistories(sessionId: string) {
    const matches = await this.prisma.match.findMany({
      where: {
        round: { sessionId },
        status: 'COMPLETED',
      },
      include: {
        players: true,
      },
    });

    const partnerHistory: Record<
      string,
      Record<string, number>
    > = {};
    const opponentHistory: Record<
      string,
      Record<string, number>
    > = {};

    const ensure = (
      map: Record<string, Record<string, number>>,
      id: string,
    ) => {
      if (!map[id]) {
        map[id] = {};
      }
      return map[id];
    };

    for (const match of matches) {
      const teamA = match.players.filter((p) => p.team === 1);
      const teamB = match.players.filter((p) => p.team === 2);

      if (teamA.length === 2) {
        const [a, b] = teamA;
        ensure(partnerHistory, a.playerId)[b.playerId] =
          (ensure(partnerHistory, a.playerId)[b.playerId] ?? 0) + 1;
        ensure(partnerHistory, b.playerId)[a.playerId] =
          (ensure(partnerHistory, b.playerId)[a.playerId] ?? 0) + 1;
      }

      if (teamB.length === 2) {
        const [a, b] = teamB;
        ensure(partnerHistory, a.playerId)[b.playerId] =
          (ensure(partnerHistory, a.playerId)[b.playerId] ?? 0) + 1;
        ensure(partnerHistory, b.playerId)[a.playerId] =
          (ensure(partnerHistory, b.playerId)[a.playerId] ?? 0) + 1;
      }

      for (const a of teamA) {
        for (const b of teamB) {
          ensure(opponentHistory, a.playerId)[b.playerId] =
            (ensure(opponentHistory, a.playerId)[b.playerId] ?? 0) + 1;
          ensure(opponentHistory, b.playerId)[a.playerId] =
            (ensure(opponentHistory, b.playerId)[a.playerId] ?? 0) + 1;
        }
      }
    }

    return { partnerHistory, opponentHistory };
  }

  async incrementGamesWaited(
    sessionId: string,
    excludePlayerIds: string[],
  ) {
    await this.prisma.player.updateMany({
      where: {
        sessionPlayers: {
          some: { sessionId },
        },
        id: {
          notIn: excludePlayerIds,
        },
      },
      data: {
        gamesWaited: { increment: 1 },
      },
    });
  }

  async resetGamesWaited(playerIds: string[]) {
    if (playerIds.length === 0) {
      return;
    }

    await this.prisma.player.updateMany({
      where: {
        id: { in: playerIds },
      },
      data: {
        gamesWaited: 0,
      },
    });
  }
}