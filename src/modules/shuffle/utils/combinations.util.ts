import { ShufflePlayer } from '../interfaces/player.interface';

export class CombinationsUtil {
  static generate(
    players: ShufflePlayer[],
  ): ShufflePlayer[][] {
    const result: ShufflePlayer[][] = [];

    const n = players.length;

    for (let i = 0; i < n - 3; i++) {
      for (let j = i + 1; j < n - 2; j++) {
        for (let k = j + 1; k < n - 1; k++) {
          for (let l = k + 1; l < n; l++) {
            result.push([
              players[i],
              players[j],
              players[k],
              players[l],
            ]);
          }
        }
      }
    }

    return result;
  }
}