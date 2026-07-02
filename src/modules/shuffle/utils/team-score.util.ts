import { ShufflePlayer } from '../interfaces/player.interface';
import { HistoryUtil } from './history.util';

export class TeamScoreUtil {
  static score(a: ShufflePlayer, b: ShufflePlayer): number {
    return (
      HistoryUtil.partnerScore(a, b) +
      Math.abs(a.skillLevel - b.skillLevel)
    );
  }

  static opponentPairScore(
    a1: ShufflePlayer,
    a2: ShufflePlayer,
    b1: ShufflePlayer,
    b2: ShufflePlayer,
  ): number {
    return (
      HistoryUtil.opponentScore(a1, b1) +
      HistoryUtil.opponentScore(a1, b2) +
      HistoryUtil.opponentScore(a2, b1) +
      HistoryUtil.opponentScore(a2, b2)
    );
  }
}