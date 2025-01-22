export type Subject =
  | 'computerArchitecture'
  | 'algorithm'
  | 'operationgSystem'
  | 'dataStructure'
  | 'database'
  | 'network';

export interface Member {
  name: string;
  email: string;
  interestSubjects: Subject[];
}
