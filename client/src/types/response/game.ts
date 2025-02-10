export interface PostCreateGameResponse {
  roomId: string;
}

export interface PostJoinGameResponse {
  isReady: boolean;
}

export interface GetIdResponse {
  playerNumber: 1 | 2;
}

export interface GetRandomTypeResponse {
  randomMatchType: 'CREATE' | 'JOIN';
  roomId: string;
}

export interface GetGameResultResponse {
  gameRoomResultStatus: 'WIN' | 'DRAW';
  winnerName: string | null;
}
