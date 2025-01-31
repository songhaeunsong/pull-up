export type RoomStatus = 'WAITING' | 'READY' | 'BOOM';

export interface Card {
  cardId: number;
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
}
