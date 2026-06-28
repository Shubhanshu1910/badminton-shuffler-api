import { Injectable } from '@nestjs/common';

import { RotationUtil } from '../utils/rotation.util';
import { TeamUtil } from '../utils/team.util';

import { ShufflePlayer } from '../interfaces/player.interface';
import { ShuffleRound } from '../interfaces/round.interface';
import { HistoryUtil } from '../utils/history.util';

@Injectable()
export class ShuffleService {
  shuffle(
    players: ShufflePlayer[],
    totalCourts: number,
    roundNumber: number,
  ): ShuffleRound {
    const sorted =
      RotationUtil.sortPlayers(players);

    const playable =
      sorted.slice(0, totalCourts * 4);

    const waiting =
      sorted.slice(totalCourts * 4);

    const courtGroups =
      RotationUtil.splitIntoCourts(
        playable,
      );

    const matches = courtGroups.map(
      (courtPlayers, index) => {
        const teams =
          TeamUtil.createTeams(
            courtPlayers,
          );

          HistoryUtil.updatePartnerHistory(
  teams.teamA[0],
  teams.teamA[1],
);

HistoryUtil.updatePartnerHistory(
  teams.teamB[0],
  teams.teamB[1],
);

HistoryUtil.updateOpponentHistory(
  teams.teamA,
  teams.teamB,
);

       return {
  courtNumber: index + 1,

  players: courtPlayers.map((p) => p.id),

  teamA: teams.teamA.map((player) => player.id),

  teamB: teams.teamB.map((player) => player.id),
};
      },
    );

    return {
      roundNumber,

      matches,

      waitingPlayers: waiting.map((p) => p.id),
    };
  }
}