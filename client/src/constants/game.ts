import { PlayerType } from '@/types/game';

export const OPPONENT: Record<PlayerType, PlayerType> = {
  player1P: 'player2P',
  player2P: 'player1P',
};
