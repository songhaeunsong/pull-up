export interface Interview {
  interviewId: number;
  interviewAnswerId: number;
  question: string;
  memberAnswer: string;
  keywords: string[];
  year: string;
  month: string;
  day: string;
  grade: string;
  strength: string;
  weakness: string;
  answer: string;
}

// 오늘의 문제 조회 응답 타입
export type InterviewResponse = Pick<Interview, 'interviewId' | 'question' | 'keywords'>;

// 답안 제출 응답 타입
export type InterviewAnswerResponse = Pick<Interview, 'interviewId' | 'interviewAnswerId'>;

// 결과 응답 타입
export type InterviewResultResponse = Pick<
  Interview,
  | 'interviewId'
  | 'question'
  | 'memberAnswer'
  | 'keywords'
  | 'grade'
  | 'year'
  | 'month'
  | 'day'
  | 'strength'
  | 'weakness'
  | 'answer'
>;

// 오늘의 문제 전체 목록 조회 응답 타입
export type InterviewListResponse = Pick<Interview, 'interviewId' | 'interviewAnswerId' | 'question'>[];
