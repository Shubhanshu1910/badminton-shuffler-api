export interface ShufflePlayer {
  id: string;

  name: string;

  skillLevel: number;

  gamesPlayed: number;

  gamesWaited: number;

  lastRoundPlayed: number;

  partnerHistory: Record<string, number>;

  opponentHistory: Record<string, number>;
}