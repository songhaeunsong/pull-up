export type Subject =
  | 'COMPUTERARCHITECTURE'
  | 'OPERATINGSYSTEM'
  | 'NETWORK'
  | 'DATABASE'
  | 'ALGORITHM'
  | 'DATASTRUCTURE';

export interface Member {
  name: string;
  email: string;
  interestSubjects: Subject[];
}
