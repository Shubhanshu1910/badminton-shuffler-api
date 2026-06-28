import { ShufflePlayer } from '../interfaces/player.interface';

export class HistoryUtil {
  static partnerScore(
    a: ShufflePlayer,
    b: ShufflePlayer,
  ): number {
    return a.partnerHistory[b.id] ?? 0;
  }

  static opponentScore(
    a: ShufflePlayer,
    b: ShufflePlayer,
  ): number {
    return a.opponentHistory[b.id] ?? 0;
  }

  static updatePartnerHistory(
    a: ShufflePlayer,
    b: ShufflePlayer,
  ): void {
    a.partnerHistory[b.id] =
      (a.partnerHistory[b.id] ?? 0) + 1;

    b.partnerHistory[a.id] =
      (b.partnerHistory[a.id] ?? 0) + 1;
  }

  static updateOpponentHistory(
    teamA: ShufflePlayer[],
    teamB: ShufflePlayer[],
  ) {
    for (const p1 of teamA) {
      for (const p2 of teamB) {
        p1.opponentHistory[p2.id] =
          (p1.opponentHistory[p2.id] ?? 0) + 1;

        p2.opponentHistory[p1.id] =
          (p2.opponentHistory[p1.id] ?? 0) + 1;
      }
    }
  }
}