import {
    BadRequestException,
    ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Messages } from '../../../common/constants/messages.constants';

import { AddCourtDto } from '../dto/add-court.dto';
import { AddPlayerDto } from '../dto/add-player.dto';
import { CreateSessionDto } from '../dto/create-session.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';

import { SessionMapper } from '../mappers/session.mapper';
import { SessionRepository } from '../repositories/session.repository';
import { SessionStatus } from '../../../common/enums/session.enum';

@Injectable()
export class SessionService {
  constructor(
    private readonly repository: SessionRepository,
  ) {}

  async create(dto: CreateSessionDto) {
    const session =
      await this.repository.create(dto);

    return SessionMapper.toResponse(session);
  }

  async findAll() {
    const sessions =
      await this.repository.findAll();

    return sessions.map(
      SessionMapper.toResponse,
    );
  }

  async findOne(id: string) {
    const session =
      await this.repository.findById(id);

    if (!session) {
      throw new NotFoundException(
        Messages.ERROR.NOT_FOUND,
      );
    }

    return SessionMapper.toResponse(session);
  }

  async update(
    id: string,
    dto: UpdateSessionDto,
  ) {
    await this.findOne(id);

    const session =
      await this.repository.update(id, dto);

    return SessionMapper.toResponse(session);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.repository.delete(id);
  }

  async addPlayers(
    id: string,
    dto: AddPlayerDto,
  ) {
    await this.findOne(id);

    return this.repository.addPlayers(
      id,
      dto.playerIds,
    );
  }

  async assignCourts(
    id: string,
    dto: AddCourtDto,
  ) {
    await this.findOne(id);

    return this.repository.assignCourts(
      id,
      dto.courtIds,
    );
  }

  async start(id: string) {
  const session = await this.repository.findById(id);

  if (!session) {
    throw new NotFoundException(Messages.ERROR.NOT_FOUND);
  }

  if (session.status === SessionStatus.ACTIVE) {
    throw new ConflictException(
      'Session is already active.',
    );
  }

  const playerCount =
    await this.repository.getPlayerCount(id);

  if (playerCount < 4) {
    throw new BadRequestException(
      'At least 4 players are required.',
    );
  }

  const courtCount =
    await this.repository.getCourtCount(id);

  if (courtCount === 0) {
    throw new BadRequestException(
      'Assign at least one court.',
    );
  }

  const updated =
    await this.repository.startSession(id);

  return SessionMapper.toResponse(updated);
}
async end(id: string) {
  await this.findOne(id);

  const updated =
    await this.repository.endSession(id);

  return SessionMapper.toResponse(updated);
}
}