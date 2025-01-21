import { Subject } from './member';

export interface Exam {
  examId: number;
  examName: string;
  date: string;
  subjects: Subject[];
}
