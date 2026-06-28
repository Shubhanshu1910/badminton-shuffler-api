import { ShufflePlayer } from '../interfaces/player.interface';

export class RotationUtil {
  static sortPlayers(
    players: ShufflePlayer[],
  ): ShufflePlayer[] {
    return [...players].sort((a, b) => {
      // Lowest games played first
      if (a.gamesPlayed !== b.gamesPlayed) {
        return a.gamesPlayed - b.gamesPlayed;
      }

      // If equal, player who has waited more gets priority
      if (a.gamesWaited !== b.gamesWaited) {
        return b.gamesWaited - a.gamesWaited;
      }

      // Stable ordering
      return a.name.localeCompare(b.name);
    });
  }

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