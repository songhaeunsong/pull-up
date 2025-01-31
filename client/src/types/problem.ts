import { Subject } from './member';

export interface Problem {
  problemId: number;
  question: string;
  subject: Subject;
  date: string;
}

export type ProblemBrief = Omit<Problem, 'data'>;

export interface ProblemDetail {
  question: string;
  options: string[];
  answer: string;
  explaination: string;
  correctRate: number;
}
