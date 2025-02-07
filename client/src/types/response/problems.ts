import { Problem } from '../problem';

export interface GetWrongProblemAllResponse {
  wrongProblemDtos: Problem[];
}

export interface GetArchivedProblemAllResponse {
  bookmarkedProblemDtos: Problem[];
}
