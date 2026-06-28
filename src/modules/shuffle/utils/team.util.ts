import { ShufflePlayer } from '../interfaces/player.interface';
import { TeamScoreUtil } from './team-score.util';

export class TeamUtil {
  static createTeams(
    players: ShufflePlayer[],
  ) {
    const combinations = [
      [
        [0, 1],
        [2, 3],
      ],

      [
        [0, 2],
        [1, 3],
      ],

      [
        [0, 3],
        [1, 2],
      ],
    ];

    let bestScore =
      Number.MAX_SAFE_INTEGER;

    let best: number[][] =
      combinations[0];

    for (const combo of combinations) {
      const score =
        TeamScoreUtil.score(
          players[combo[0][0]],
          players[combo[0][1]],
        ) +
        TeamScoreUtil.score(
          players[combo[1][0]],
          players[combo[1][1]],
        );

      if (score < bestScore) {
        bestScore = score;
        best = combo;
      }
    }

    return {
      teamA: [
        players[best[0][0]],
        players[best[0][1]],
      ],

      teamB: [
        players[best[1][0]],
        players[best[1][1]],
      ],
    };
  }
}