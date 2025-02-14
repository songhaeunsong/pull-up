import { Interview } from '../interview';

// 답안 제출 요청 타입
export type AnswerRequest = Pick<Interview, 'interviewId' | 'answer'>;
