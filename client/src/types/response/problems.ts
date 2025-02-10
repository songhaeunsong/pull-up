import { Problem, ProblemBrief } from '../problem';

export interface GetWrongProblemAllResponse {
  wrongProblemDtos: Problem[];
}

export interface GetRecentWrongProblem {
  recentWrongQuestionDtos: ProblemBrief[];
}

export interface GetArchivedProblemAllResponse {
  bookmarkedProblemDtos: Problem[];
}
