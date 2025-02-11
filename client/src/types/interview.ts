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
