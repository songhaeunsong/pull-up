import { Streak } from '../chart';
import { Interview } from '../interview';

export interface GetStreakResponse {
  dailySolvedHistories: Streak[];
}

// 오늘의 문제 조회 응답 타입
export type InterviewResponse = Pick<Interview, 'interviewId' | 'question' | 'keywords'>;

// 결과 응답 타입
export type InterviewResultResponse = Pick<
  Interview,
  'interviewId' | 'question' | 'memberAnswer' | 'keywords' | 'createdAt' | 'strength' | 'weakness' | 'answer'
>;

// 지난 오늘의 문제 전체 목록 조회 응답 타입
export type InterviewListResponse = Pick<Interview, 'interviewId' | 'interviewAnswerId' | 'question'>;
