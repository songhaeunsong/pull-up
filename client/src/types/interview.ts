export interface Interview {
  interviewId: number;
  interviewAnswerId: number;
  question: string;
  memberAnswer: string;
  keywords: string[];
  date: string;
  strength: string;
  weakness: string;
  answer: string;
}

export interface InterviewAnswer {
  interviewId: number;
  interviewAnswerId: number;
  memberName: string;
  date: string;
  keywords: string[];
  answer: string;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  commentList: Comment[];
}

export interface Comment {
  commentId: number;
  otherMemberName: string;
  email: string;
  comment: string;
}

// 오늘의 문제 조회 응답 타입
export type InterviewResponse = Pick<Interview, 'interviewId' | 'question' | 'keywords'>;

// 답안 제출 요청 타입
export type MemberAnswerRequest = Pick<Interview, 'interviewId' | 'interviewAnswerId'>;

// 결과 응답 타입
export type InterviewResultResponse = Pick<
  Interview,
  'interviewId' | 'question' | 'memberAnswer' | 'keywords' | 'date' | 'strength' | 'weakness' | 'answer'
>;

// 지난 오늘의 문제 전체 목록 조회 응답 타입
export type InterviewListResponse = Pick<Interview, 'interviewId' | 'interviewAnswerId' | 'question'>;

// 다른 사람 답변 전체 목록 조회 응답 타입
export type InterviewAnswerListResponse = Pick<
  InterviewAnswer,
  'interviewId' | 'interviewAnswerId' | 'memberName' | 'date' | 'answer' | 'isLiked' | 'likeCount' | 'commentCount'
>;

// 다른 사람 답변 상세 조회 응답 타임
export type InterviewAnswerDetailResponse = Pick<
  InterviewAnswer,
  'interviewAnswerId' | 'memberName' | 'date' | 'keywords' | 'answer' | 'isLiked' | 'likeCount' | 'commentCount'
> & { commentList: Pick<Comment, 'commentId' | 'otherMemberName' | 'email' | 'comment'>[] };

// 댓글 작성 요청 타입
export type CommentRequest = Pick<Comment, 'comment'> & { interviewAnswerId: number };
