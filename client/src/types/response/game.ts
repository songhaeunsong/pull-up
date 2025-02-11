import { PlayerType } from '../game';

export interface PostCreateGameResponse {
  roomId: string;
}

export interface PostJoinGameResponse {
  isReady: boolean;
}

export interface GetPlayerTypeResponse {
  playerType: PlayerType;
}

export interface GetRandomTypeResponse {
  randomMatchType: 'CREATE' | 'JOIN';
  roomId: string;
}

export interface GetGameResultResponse {
  gameRoomResultStatus: 'WIN' | 'DRAW' | 'LOSE';
  isForfeitGame: boolean;
  name: string;
  score: number;
  opponentName: string;
  opponentScore: number;
}
