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
import { SocketService } from '../../socket/services/socket.service';
import { RoundService } from '../../round/services/round.service';

@Injectable()
export class GameService {
  constructor(
    private readonly repository: GameRepository,
    private readonly roundService: RoundService,
    private readonly socketService: SocketService,
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
    const startedMatch = await this.repository.startMatch(dto.matchId);

    this.socketService.emitToSession(
      match.round.sessionId,
      'match-started',
      startedMatch,
    );

    return startedMatch;
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

    const updatedMatch = await this.repository.updateScore(
  id,
  dto.teamAScore,
  dto.teamBScore,
);

this.socketService.emitToSession(
  match.round.sessionId,
  'score-updated',
  updatedMatch,
);

return updatedMatch;
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

      if (roundCompleted) {
  const nextRound =
    await this.roundService.generate(
      match.round.sessionId,
    );

  this.socketService.emitToSession(
    match.round.sessionId,
    'next-round',
    nextRound,
  );

  return {
    match: completed,
    roundCompleted,
    nextRound,
  };
}

  }
}