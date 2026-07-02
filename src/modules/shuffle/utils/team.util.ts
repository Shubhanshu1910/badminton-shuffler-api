import { ShufflePlayer } from '../interfaces/player.interface';
import { TeamScoreUtil } from './team-score.util';

export class TeamUtil {
  static createTeams(
    players: ShufflePlayer[],
    courtIndex = 0,
    roundNumber = 1,
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

    const scored = combinations.map((combo) => ({
      combo,
      score:
        TeamScoreUtil.score(players[combo[0][0]], players[combo[0][1]]) +
        TeamScoreUtil.score(players[combo[1][0]], players[combo[1][1]]) +
        TeamScoreUtil.opponentPairScore(
          players[combo[0][0]],
          players[combo[0][1]],
          players[combo[1][0]],
          players[combo[1][1]],
        ),
    }));

    const bestScore = Math.min(...scored.map((s) => s.score));
    const tied = scored.filter((s) => s.score === bestScore);
    const pick =
      tied[(roundNumber + courtIndex) % tied.length]?.combo ??
      combinations[0];

    return {
      teamA: [players[pick[0][0]], players[pick[0][1]]],
      teamB: [players[pick[1][0]], players[pick[1][1]]],
    };
  }
}
