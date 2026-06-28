import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { buildPagination } from '../../../common/utils/pagination.util';
import { Messages } from '../../../common/constants/messages.constants';

import { CreatePlayerDto } from '../dto/create-player.dto';
import { PlayerQueryDto } from '../dto/player-query.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayerMapper } from '../mapper/player.mapper';

@Injectable()
export class PlayerService {
  constructor(
    private readonly repository: PlayerRepository,
  ) {}

  async create(dto: CreatePlayerDto) {
  const existingPlayer =
    await this.repository.findByName(dto.name);

  if (existingPlayer) {
    throw new ConflictException(
      'Player already exists.',
    );
  }

  const player = await this.repository.create(dto);

  return PlayerMapper.toResponse(player);
}

  async findAll(query: PlayerQueryDto) {
    const result = await this.repository.findAll(query);

    return buildPagination(
      PlayerMapper.toResponseList(result.items),
      result.total,
      query.page,
      query.limit,
    );
  }

  async findOne(id: string) {
    const player = await this.repository.findById(id);

    if (!player) {
      throw new NotFoundException(Messages.ERROR.NOT_FOUND);
    }

    return PlayerMapper.toResponse(player);
  }

  async update(
    id: string,
    dto: UpdatePlayerDto,
  ) {
    await this.findOne(id);

    const player =
  await this.repository.update(id, dto);

return PlayerMapper.toResponse(player);
  }

  async remove(id: string) {
    await this.findOne(id);

    const player =
  await this.repository.softDelete(id);
    return PlayerMapper.toResponse(player);
  }
}