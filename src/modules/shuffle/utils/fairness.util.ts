import { ShufflePlayer } from '../interfaces/player.interface';
import { FairnessScore } from '../interfaces/fairness-score.interface';

export class FairnessUtil {
  static score(
    teamA: ShufflePlayer[],
    teamB: ShufflePlayer[],
  ): FairnessScore {
    let partner = 0;
    let opponent = 0;

    for (const p of teamA) {
      for (const q of teamA) {
        if (p.id !== q.id) {
          partner += p.partnerHistory[q.id] ?? 0;
        }
      }
    }

    for (const p of teamB) {
      for (const q of teamB) {
        if (p.id !== q.id) {
          partner += p.partnerHistory[q.id] ?? 0;
        }
      }
    }

    for (const p of teamA) {
      for (const q of teamB) {
        opponent += p.opponentHistory[q.id] ?? 0;
      }
    }

    const waiting = 0;

    const skill =
      Math.abs(
        teamA[0].skillLevel +
          teamA[1].skillLevel -
          (teamB[0].skillLevel +
            teamB[1].skillLevel),
      );

    const playTime =
      [...teamA, ...teamB]
        .map((p) => p.gamesPlayed)
        .reduce((a, b) => a + b, 0);

    return {
      partnerScore: partner,

      opponentScore: opponent,

      waitingScore: waiting,

      skillScore: skill,

      playTimeScore: playTime,

      total:
        partner * 10 +
        opponent * 8 +
        skill * 4 +
        playTime * 2,
    };
  }
}