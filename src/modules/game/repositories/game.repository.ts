import { Injectable } from '@nestjs/common';
import {
  Match,
  MatchStatus,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';


@Injectable()
export class GameRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string): Promise<Match | null> {
    return this.prisma.match.findUnique({
      where: {
        id,
      },
      include: {
        players: {
          include: {
            player: true,
          },
        },
        court: true,
        round: true,
      },
    });
  }

  async startMatch(id: string): Promise<Match> {
    return this.prisma.match.update({
      where: {
        id,
      },
      data: {
        status: MatchStatus.PLAYING,
        startedAt: new Date(),
      },
    });
  }

  async updateScore(
    id: string,
    teamAScore: number,
    teamBScore: number,
  ): Promise<Match> {
    return this.prisma.match.update({
      where: {
        id,
      },
      data: {
        teamAScore,
        teamBScore,
      },
    });
  }

  async finishMatch(
    id: string,
    winner: number,
  ): Promise<Match> {
    return this.prisma.match.update({
      where: {
        id,
      },
      data: {
        status: MatchStatus.COMPLETED,
        winner,
        endedAt: new Date(),
      },
    });
  }

  async updatePlayerStatistics(
    matchId: string,
    winner: number,
  ): Promise<void> {
    const players =
      await this.prisma.matchPlayer.findMany({
        where: {
          matchId,
        },
      });

    await this.prisma.$transaction(
      players.map((player: { playerId: any; team: number; }) =>
        this.prisma.player.update({
          where: {
            id: player.playerId,
          },
          data: {
            gamesPlayed: {
              increment: 1,
            },
            gamesWon:
              player.team === winner
                ? {
                    increment: 1,
                  }
                : undefined,
            gamesLost:
              player.team !== winner
                ? {
                    increment: 1,
                  }
                : undefined,
          },
        }),
      ),
    );
  }

  async areAllMatchesCompleted(
    roundId: string,
  ): Promise<boolean> {
    const count =
      await this.prisma.match.count({
        where: {
          roundId,
          status: {
            not: MatchStatus.COMPLETED,
          },
        },
      });

    return count === 0;
  }
}