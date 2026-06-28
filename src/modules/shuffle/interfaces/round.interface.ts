import { ShuffleMatch } from './match.interface';

export interface ShuffleRound {
  roundNumber: number;

  matches: ShuffleMatch[];

  waitingPlayers: string[];
}