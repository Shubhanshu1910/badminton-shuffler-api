import { ShufflePlayer } from '../interfaces/player.interface';

export class RotationUtil {

  static splitIntoCourts(
  players: ShufflePlayer[],
): ShufflePlayer[][] {

  const courts: ShufflePlayer[][] = [];

  for (let i = 0; i < players.length; i += 4) {
    courts.push(players.slice(i, i + 4));
  }

  return courts;
}

}