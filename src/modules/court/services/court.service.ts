import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Messages } from '../../../common/constants/messages.constants';
import { buildPagination } from '../../../common/utils/pagination.util';

import { CourtMapper } from '../mappers/court.mapper';
import { CreateCourtDto } from '../dto/create-court.dto';
import { CourtQueryDto } from '../dto/court-query.dto';
import { UpdateCourtDto } from '../dto/update-court.dto';
import { CourtRepository } from '../repositories/court.repository';

@Injectable()
export class CourtService {
  constructor(
    private readonly repository: CourtRepository,
  ) {}

  async create(dto: CreateCourtDto) {
    const existing = await this.repository.findByCourtNumber(
      dto.courtNumber,
    );

    if (existing) {
      throw new ConflictException(
        'Court number already exists.',
      );
    }

    const court = await this.repository.create(dto);

    return CourtMapper.toResponse(court);
  }

  async findAll(query: CourtQueryDto) {
    const result = await this.repository.findAll(query);

    return buildPagination(
      CourtMapper.toResponseList(result.items),
      result.total,
      query.page,
      query.limit,
    );
  }

  async findOne(id: string) {
    const court = await this.repository.findById(id);

    if (!court) {
      throw new NotFoundException(
        Messages.ERROR.NOT_FOUND,
      );
    }

    return CourtMapper.toResponse(court);
  }

  async update(
    id: string,
    dto: UpdateCourtDto,
  ) {
    await this.findOne(id);

    const court = await this.repository.update(id, dto);

    return CourtMapper.toResponse(court);
  }

  async remove(id: string) {
    await this.findOne(id);

    const court = await this.repository.softDelete(id);

    return CourtMapper.toResponse(court);
  }
}