import { CorrectRate, Score } from '../chart';
import { Exam } from '../exam';

export interface GetExamAllResponse {
  content: Exam[];
  pageable: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
}

export interface GetScoreResponse {
  examScoreDtos: Score[];
}

export interface GetCorrectRateResponse {
  examStrengthDtos: CorrectRate[];
}
