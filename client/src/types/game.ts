export type RoomStatus = 'WAITING' | 'PLAYING' | 'FINISHED';

export interface Card {
  type: 'question' | 'answer';
  disabled: boolean;
  content: string;
}

export interface Player {
  memberId: number;
  name: string;
  score: number;
}

export interface StompRoomInfo {
  roomId: string;
  player1P: Player;
  player2P: Player;
  problemCardWithoutCardIds: Card[];
}

export interface SubjectSelect {
  algorithm: boolean;
  computerArchitecture: boolean;
  database: boolean;
  dataStructure: boolean;
  network: boolean;
  operatingSystem: boolean;
}
