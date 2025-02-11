import { PlayerType, SubjectSelect } from '@/types/game';
import { Subject } from '@/types/member';

export const OPPONENT: Record<PlayerType, PlayerType> = {
  player1P: 'player2P',
  player2P: 'player1P',
};

export const SUBJECT_KEY: { [key in Subject]: keyof SubjectSelect } = {
  COMPUTER_ARCHITECTURE: 'computerArchitecture',
  OPERATING_SYSTEM: 'operatingSystem',
  NETWORK: 'network',
  DATABASE: 'database',
  ALGORITHM: 'algorithm',
  DATA_STRUCTURE: 'dataStructure',
};
