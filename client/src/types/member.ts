export type Subject =
  | 'COMPUTER_ARCHITECTURE'
  | 'OPERATING_SYSTEM'
  | 'NETWORK'
  | 'DATABASE'
  | 'ALGORITHM'
  | 'DATA_STRUCTURE';

export interface Member {
  name: string;
  email: string;
  interestSubjects: Subject[];
}
