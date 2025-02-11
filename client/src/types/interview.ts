export interface Interview {
  interviewId: number;
  interviewAnswerId: number;
  question: string;
  memberAnswer: string;
  keywords: string[];
  createdAt: string;
  strength: string;
  weakness: string;
  answer: string;
}

export interface InterviewAnswer {
  interviewAnswerId: number;
  question: string;
  keywords: string[];
  memberName: string;
  answer: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
}

export interface Comment {
  commentId: number;
  writer: string;
  email: string;
  content: string;
  createdAt: string;
}

// 오늘의 문제 조회 응답 타입
export type InterviewResponse = Pick<Interview, 'interviewId' | 'question' | 'keywords'>;

// 답안 제출 요청 타입
export type MemberAnswerRequest = Pick<Interview, 'interviewId' | 'interviewAnswerId'>;

// 결과 응답 타입
export type InterviewResultResponse = Pick<
  Interview,
  'interviewId' | 'question' | 'memberAnswer' | 'keywords' | 'createdAt' | 'strength' | 'weakness' | 'answer'
>;

// 지난 오늘의 문제 전체 목록 조회 응답 타입
export type InterviewListResponse = Pick<Interview, 'interviewId' | 'interviewAnswerId' | 'question'>;

// 댓글 작성 요청 타입
export type CommentRequest = Pick<Comment, 'content'> & { interviewAnswerId: number };
