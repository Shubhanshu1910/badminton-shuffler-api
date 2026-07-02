import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MatchStatus } from '@prisma/client';

import { RoundRepository } from '../repositories/round.repository';
import { ShuffleService } from '../../shuffle/services/shuffle.service';
import { ShufflePlayer } from '../../shuffle/interfaces/player.interface';
import { RotationUtil } from '../../shuffle/utils/rotation.util';
import { TeamUtil } from '../../shuffle/utils/team.util';

@Injectable()
export class RoundService {
  constructor(
    private readonly repository: RoundRepository,
    private readonly shuffleService: ShuffleService,
  ) {}

  private async buildShufflePlayers(
    sessionId: string,
  ): Promise<ShufflePlayer[]> {
    const sessionPlayers =
      await this.repository.getSessionPlayers(sessionId);

    const { partnerHistory, opponentHistory } =
      await this.repository.buildPartnerHistories(sessionId);

    return sessionPlayers.map((sp) => ({
      id: sp.player.id,
      name: sp.player.name,
      skillLevel: sp.player.skillLevel,
      gamesPlayed: sp.player.gamesPlayed,
      gamesWaited: sp.player.gamesWaited,
      lastRoundPlayed: 0,
      partnerHistory: partnerHistory[sp.player.id] ?? {},
      opponentHistory: opponentHistory[sp.player.id] ?? {},
    }));
  }

  private mapMatchPlayers(
    match: any,
    sessionPlayers: Awaited<
      ReturnType<RoundRepository['getSessionPlayers']>
    >,
  ) {
    const teamA = match.players
      .filter((p: any) => p.team === 1)
      .map((p: any) => ({
        id: p.player.id,
        name: p.player.name,
        skillLevel: p.player.skillLevel,
        team: 1,
        position: p.position,
      }));

    const teamB = match.players
      .filter((p: any) => p.team === 2)
      .map((p: any) => ({
        id: p.player.id,
        name: p.player.name,
        skillLevel: p.player.skillLevel,
        team: 2,
        position: p.position,
      }));

    return {
      matchId: match.id,
      courtId: match.courtId,
      courtNumber: match.court?.courtNumber ?? 0,
      status: match.status,
      teamA,
      teamB,
      players: match.players.map((p: any) => ({
        id: p.player.id,
        name: p.player.name,
        skillLevel: p.player.skillLevel,
        team: p.team,
        position: p.position,
      })),
    };
  }

  private async computeWaitingPlayers(
    sessionId: string,
    roundId: string,
  ) {
    const shufflePlayers =
      await this.buildShufflePlayers(sessionId);

    const activeIds =
      await this.repository.getActivePlayerIdsInRound(roundId);

    const sorted = RotationUtil.sortPlayers(shufflePlayers);

    return sorted
      .filter((p) => !activeIds.has(p.id))
      .map((p) => ({
        id: p.id,
        name: p.name,
        skillLevel: p.skillLevel,
      }));
  }

  private pickDisplayMatches(matches: any[]) {
    const byCourt = new Map<string, any[]>();

    for (const match of matches) {
      const list = byCourt.get(match.courtId) ?? [];
      list.push(match);
      byCourt.set(match.courtId, list);
    }

    const display: any[] = [];

    for (const courtMatches of byCourt.values()) {
      courtMatches.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      );

      const active = courtMatches.find(
        (m) => m.status !== MatchStatus.COMPLETED,
      );

      display.push(active ?? courtMatches[0]);
    }

    return display.sort(
      (a, b) =>
        (a.court?.courtNumber ?? 0) -
        (b.court?.courtNumber ?? 0),
    );
  }

  private async formatRoundView(sessionId: string, round: any) {
    const sessionPlayers =
      await this.repository.getSessionPlayers(sessionId);

    const displayMatches = this.pickDisplayMatches(round.matches);

    const matches = displayMatches.map((match: any) =>
      this.mapMatchPlayers(match, sessionPlayers),
    );

    const waitingPlayers = await this.computeWaitingPlayers(
      sessionId,
      round.id,
    );

    const activeMatches = displayMatches.filter(
      (m: any) => m.status !== MatchStatus.COMPLETED,
    ).length;

    return {
      id: round.id,
      roundNumber: round.roundNumber,
      status: round.status,
      matches,
      activeMatches,
      waitingPlayers,
      waitingCount: waitingPlayers.length,
    };
  }

  async generate(sessionId: string) {
    const sessionPlayers =
      await this.repository.getSessionPlayers(sessionId);

    const sessionCourts =
      await this.repository.getSessionCourts(sessionId);

    if (sessionPlayers.length < 4) {
      throw new NotFoundException('Minimum 4 players required.');
    }

    if (sessionCourts.length === 0) {
      throw new NotFoundException('No courts assigned.');
    }

    const latestRound =
      await this.repository.getLatestRound(sessionId);

    const roundNumber = latestRound?.roundNumber
      ? latestRound.roundNumber + 1
      : 1;

    const players = await this.buildShufflePlayers(sessionId);

    const result = this.shuffleService.shuffle(
      players,
      sessionCourts.length,
      roundNumber,
    );

    const round = await this.repository.createRound(
      sessionId,
      roundNumber,
    );

    const playingIds: string[] = [];

    const generatedMatches: any[] = [];

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

      playingIds.push(
        ...result.matches[i].teamA,
        ...result.matches[i].teamB,
      );

      generatedMatches.push({
        matchId: match.id,
        courtId: sessionCourts[i].court.id,
        courtNumber: result.matches[i].courtNumber,
        status: MatchStatus.PENDING,
        teamA: result.matches[i].teamA.map((id) => {
          const player = sessionPlayers.find(
            (p) => p.player.id === id,
          );
          return {
            id: player!.player.id,
            name: player!.player.name,
            skillLevel: player!.player.skillLevel,
          };
        }),
        teamB: result.matches[i].teamB.map((id) => {
          const player = sessionPlayers.find(
            (p) => p.player.id === id,
          );
          return {
            id: player!.player.id,
            name: player!.player.name,
            skillLevel: player!.player.skillLevel,
          };
        }),
        players: result.matches[i].players.map((id) => {
          const player = sessionPlayers.find(
            (p) => p.player.id === id,
          );
          return {
            id: player!.player.id,
            name: player!.player.name,
          };
        }),
      });
    }

    await this.repository.resetGamesWaited(playingIds);
    await this.repository.incrementGamesWaited(
      sessionId,
      playingIds,
    );

    const waitingPlayers = result.waitingPlayers.map((id) => {
      const player = sessionPlayers.find(
        (p) => p.player.id === id,
      );
      return {
        id: player!.player.id,
        name: player!.player.name,
        skillLevel: player!.player.skillLevel,
      };
    });

    return {
      round,
      matches: generatedMatches,
      waitingPlayers,
      waitingCount: waitingPlayers.length,
    };
  }

  async rematchCourt(
    sessionId: string,
    courtId: string,
    roundId: string,
  ) {
    const sessionCourts =
      await this.repository.getSessionCourts(sessionId);

    const courtIndex = sessionCourts.findIndex(
      (sc) => sc.court.id === courtId,
    );

    if (courtIndex < 0) {
      throw new NotFoundException('Court not assigned to session.');
    }

    const round =
      await this.repository.getCurrentRound(sessionId);

    if (!round || round.id !== roundId) {
      throw new NotFoundException('Round not found.');
    }

    const shufflePlayers =
      await this.buildShufflePlayers(sessionId);

    const activeIds =
      await this.repository.getActivePlayerIdsInRound(roundId);

    const sorted = RotationUtil.sortPlayers(shufflePlayers);
    const available = sorted.filter((p) => !activeIds.has(p.id));

    if (available.length < 4) {
      const waitingPlayers = await this.computeWaitingPlayers(
        sessionId,
        roundId,
      );

      return {
        courtRematch: null,
        waitingPlayers,
        waitingCount: waitingPlayers.length,
        message: 'Not enough waiting players for court rematch.',
      };
    }

    const nextFour = available.slice(0, 4);
    const teams = TeamUtil.createTeams(
      nextFour,
      courtIndex,
      round.roundNumber,
    );

    const teamAIds = teams.teamA.map((p) => p.id);
    const teamBIds = teams.teamB.map((p) => p.id);
    const playingIds = [...teamAIds, ...teamBIds];

    const newMatch = await this.repository.createMatch(
      roundId,
      courtId,
    );

    await this.repository.createMatchPlayers(
      newMatch.id,
      teamAIds,
      teamBIds,
    );

    await this.repository.resetGamesWaited(playingIds);
    await this.repository.incrementGamesWaited(
      sessionId,
      [
        ...Array.from(activeIds),
        ...playingIds,
      ],
    );

    const sessionPlayers =
      await this.repository.getSessionPlayers(sessionId);

    const matchPayload = {
      matchId: newMatch.id,
      courtId,
      courtNumber: sessionCourts[courtIndex].court.courtNumber,
      status: MatchStatus.PENDING,
      teamA: teams.teamA.map((p) => ({
        id: p.id,
        name: p.name,
        skillLevel: p.skillLevel,
      })),
      teamB: teams.teamB.map((p) => ({
        id: p.id,
        name: p.name,
        skillLevel: p.skillLevel,
      })),
      players: nextFour.map((p) => ({
        id: p.id,
        name: p.name,
        skillLevel: p.skillLevel,
      })),
    };

    const waitingPlayers = await this.computeWaitingPlayers(
      sessionId,
      roundId,
    );

    return {
      courtRematch: matchPayload,
      waitingPlayers,
      waitingCount: waitingPlayers.length,
    };
  }

  async getCurrentRound(sessionId: string) {
    const round =
      await this.repository.getCurrentRound(sessionId);

    if (!round) {
      throw new NotFoundException('No round found.');
    }

    return this.formatRoundView(sessionId, round);
  }
}
