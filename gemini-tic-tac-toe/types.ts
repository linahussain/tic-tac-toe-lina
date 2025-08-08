
export type SquareValue = 'X' | 'O' | null;

export enum GameMode {
  SINGLE_PLAYER = 'SINGLE_PLAYER',
  MULTIPLAYER = 'MULTIPLAYER',
}

export enum GameStage {
  SETUP = 'SETUP',
  PLAYING = 'PLAYING',
}

export interface Player {
  name: string;
  score: number;
}

export interface Players {
  X: Player;
  O: Player;
}
