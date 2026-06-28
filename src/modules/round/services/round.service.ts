import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RoundRepository } from '../repositories/round.repository';
import { ShuffleService } from '../../shuffle/services/shuffle.service';
import { ShufflePlayer } from '../../shuffle/interfaces/player.interface';

@Injectable()
export class RoundService {
  constructor(
    private readonly repository: RoundRepository,
    private readonly shuffleService: ShuffleService,
  ) {}

  async generate(sessionId: string) {
    const sessionPlayers =
      await this.repository.getSessionPlayers(
        sessionId,
      );

    const sessionCourts =
      await this.repository.getSessionCourts(
        sessionId,
      );

    if (sessionPlayers.length < 4) {
      throw new NotFoundException(
        'Minimum 4 players required.',
      );
    }

    if (sessionCourts.length === 0) {
      throw new NotFoundException(
        'No courts assigned.',
      );
    }
    const generatedMatches: any[] = [];

    const latestRound =
      await this.repository.getLatestRound(
        sessionId,
      );

    const roundNumber =
      latestRound?.roundNumber
        ? latestRound.roundNumber + 1
        : 1;

    const players: ShufflePlayer[] =
      sessionPlayers.map((sp) => ({
        id: sp.player.id,
        name: sp.player.name,
        skillLevel: sp.player.skillLevel,
        gamesPlayed: sp.player.gamesPlayed,
        gamesWaited: sp.player.gamesWaited,
        lastRoundPlayed: 0,
        partnerHistory: {},
        opponentHistory: {},
      }));

    const result =
      this.shuffleService.shuffle(
        players,
        sessionCourts.length,
        roundNumber,
      );

    const round =
      await this.repository.createRound(
        sessionId,
        roundNumber,
      );

    for (let i = 0; i < result.matches.length; i++) {
      const match = await this.repository.createMatch(
    round.id,
    sessionCourts[i].court.id,
  );

      await this.repository.createMatchPlayers(
        match.id,
        result.matches[i].teamA,
        result.matches[i].teamB,
      );

      generatedMatches.push({
        matchId: match.id,
        courtId: sessionCourts[i].court.id,
        courtNumber: result.matches[i].courtNumber,
        teamA: result.matches[i].teamA,
        teamB: result.matches[i].teamB,
        players: result.matches[i].players,
      });
    }

    return {
      round,
      matches: generatedMatches,
      waitingPlayers:
        result.waitingPlayers,
    };
  }
}