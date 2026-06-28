import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MatchStatus } from '@prisma/client';

import { GameRepository } from '../repositories/game.repository';
import { StartGameDto } from '../dto/start-game.dto';
import { UpdateScoreDto } from '../dto/update-score.dto';
import { FinishGameDto } from '../dto/finish-game.dto';

@Injectable()
export class GameService {
  constructor(
    private readonly repository: GameRepository,
  ) {}

  async start(dto: StartGameDto) {
    const match = await this.repository.findById(dto.matchId);

    if (!match) {
      throw new NotFoundException('Match not found.');
    }

    if (match.status !== MatchStatus.PENDING) {
      throw new BadRequestException(
        'Match has already started.',
      );
    }

    return this.repository.startMatch(dto.matchId);
  }

  async updateScore(
    id: string,
    dto: UpdateScoreDto,
  ) {
    const match = await this.repository.findById(id);

    if (!match) {
      throw new NotFoundException('Match not found.');
    }

    if (match.status !== MatchStatus.PLAYING) {
      throw new BadRequestException(
        'Match is not in progress.',
      );
    }

    return this.repository.updateScore(
      id,
      dto.teamAScore,
      dto.teamBScore,
    );
  }

  async finish(
    id: string,
    dto: FinishGameDto,
  ) {
    const match = await this.repository.findById(id);

    if (!match) {
      throw new NotFoundException('Match not found.');
    }

    if (match.status !== MatchStatus.PLAYING) {
      throw new BadRequestException(
        'Match is not currently playing.',
      );
    }

    const completed = await this.repository.finishMatch(
      id,
      dto.winner,
    );

    await this.repository.updatePlayerStatistics(
      id,
      dto.winner,
    );

    const roundCompleted =
      await this.repository.areAllMatchesCompleted(
        completed.roundId,
      );

    return {
      match: completed,
      roundCompleted,
    };
  }
}