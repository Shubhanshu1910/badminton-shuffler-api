import { Injectable } from '@nestjs/common';
import { Prisma, Player } from '@prisma/client';

import { PlayerQueryDto } from '../dto/player-query.dto';
import { PrismaService } from '../../../../database/prisma.service';

@Injectable()
export class PlayerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PlayerCreateInput): Promise<Player> {
    return this.prisma.player.create({
      data,
    });
  }

  async findById(id: string): Promise<Player | null> {
    return this.prisma.player.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findAll(query: PlayerQueryDto) {
    const { page, limit, search, isActive } = query;

    const where: Prisma.PlayerWhereInput = {
      deletedAt: null,
    };

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.player.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.player.count({ where }),
    ]);

    return {
      items,
      total,
    };
  }

  async update(
    id: string,
    data: Prisma.PlayerUpdateInput,
  ): Promise<Player> {
    return this.prisma.player.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<Player> {
    return this.prisma.player.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findByName(
    name: string,
  ): Promise<Player | null> {
    return this.prisma.player.findFirst({
      where: {
        name,
        deletedAt: null,
      },
    });
  }
}