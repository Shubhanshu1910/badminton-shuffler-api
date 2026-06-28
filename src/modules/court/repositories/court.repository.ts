import { Injectable } from '@nestjs/common';
import { Court } from '@prisma/client';
import { CourtQueryDto } from '../dto/court-query.dto';
import { PrismaService } from '../../../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourtRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CourtCreateInput): Promise<Court> {
    return this.prisma.court.create({
      data,
    });
  }

  async findById(id: string): Promise<Court | null> {
    return this.prisma.court.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findByCourtNumber(courtNumber: number): Promise<Court | null> {
    return this.prisma.court.findFirst({
      where: {
        courtNumber,
        deletedAt: null,
      },
    });
  }

  async findAll(query: CourtQueryDto) {
    const { page, limit, search, isActive } = query;

    const where: Prisma.CourtWhereInput = {
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
      this.prisma.court.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          courtNumber: 'asc',
        },
      }),
      this.prisma.court.count({
        where,
      }),
    ]);

    return {
      items,
      total,
    };
  }

  async update(
    id: string,
    data: Prisma.CourtUpdateInput,
  ): Promise<Court> {
    return this.prisma.court.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<Court> {
    return this.prisma.court.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}