import { Problem, ProblemBrief, ProblemDetail } from '@/types/problem';
import api from './instance';
import { useQuery } from '@tanstack/react-query';

// 틀린 문제 전체 조회
interface GetWrongQuestionAllResponse {
  wrongProblemDtos: Problem[];
}

const getWrongQuestionAll = () => api.get<GetWrongQuestionAllResponse>('problem/me/all').json();

export const useGetWrongQuestionAll = () =>
  useQuery({
    queryKey: ['wrongQuestions'],
    queryFn: () => getWrongQuestionAll(),
  });

// 내가 틀린 문제 최근 10건 조회
const getRecentWrongQuestion = () => api.get<ProblemBrief[]>('problem/wrong/recent').json();
export const useGetRecentWrongQuestion = () =>
  useQuery({
    queryKey: ['recentWrongQuestions'],
    queryFn: () => getRecentWrongQuestion(),
  });

// 문제 단건 조회
const getQuestionDetail = (problemId: number) => api.get<ProblemDetail>(`problem/${problemId}`).json();

export const useGetQuestionDetail = (problemId: number) =>
  useQuery({
    queryKey: ['question', problemId],
    queryFn: () => getQuestionDetail(problemId),
  });

// 북마크 문제 전체 조회
const getProblemArchiveAll = () => api.get<Problem[]>('problem/archive/all').json();

export const useGetProblemArchiveAll = () =>
  useQuery({
    queryKey: ['problemArchives'],
    queryFn: () => getProblemArchiveAll(),
  });
