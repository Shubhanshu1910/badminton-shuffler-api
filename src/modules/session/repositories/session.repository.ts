import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Session,
} from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';


@Injectable()
export class SessionRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    data: Prisma.SessionCreateInput,
  ): Promise<Session> {
    return this.prisma.session.create({
      data,
    });
  }

  async findById(
    id: string,
  ): Promise<Session | null> {
    return this.prisma.session.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findAll() {
    return this.prisma.session.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(
    id: string,
    data: Prisma.SessionUpdateInput,
  ) {
    return this.prisma.session.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.session.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async assignCourts(
    sessionId: string,
    courtIds: string[],
  ) {
    return this.prisma.sessionCourt.createMany({
      data: courtIds.map((courtId) => ({
        sessionId,
        courtId,
      })),
      skipDuplicates: true,
    });
  }

  async addPlayers(
    sessionId: string,
    playerIds: string[],
  ) {
    return this.prisma.sessionPlayer.createMany({
      data: playerIds.map((playerId) => ({
        sessionId,
        playerId,
      })),
      skipDuplicates: true,
    });
  }

  async getPlayerCount(sessionId: string): Promise<number> {
  return this.prisma.sessionPlayer.count({
    where: {
      sessionId,
    },
  });
}

async getCourtCount(sessionId: string): Promise<number> {
  return this.prisma.sessionCourt.count({
    where: {
      sessionId,
    },
  });
}

async startSession(id: string) {
  return this.prisma.session.update({
    where: {
      id,
    },
    data: {
      status: 'ACTIVE',
      startedAt: new Date(),
      currentRound: 1,
    },
  });
}
async endSession(id: string) {
  return this.prisma.session.update({
    where: {
      id,
    },
    data: {
      status: 'COMPLETED',
      endedAt: new Date(),
    },
  });
}
}