import { ShufflePlayer } from '../interfaces/player.interface';
import { HistoryUtil } from './history.util';

export class TeamScoreUtil {
  static score(
    a: ShufflePlayer,
    b: ShufflePlayer,
  ): number {
    return (
      HistoryUtil.partnerScore(a, b) +
      Math.abs(a.skillLevel - b.skillLevel)
    );
  }
}