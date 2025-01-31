import { Problem, ProblemBrief, ProblemDetail } from '@/types/problem';
import api from './instance';
import { useQuery } from '@tanstack/react-query';

const getWrongQuestionAll = () => api.get<Problem[]>('/problem/wrong-question/me/all');

export const useGetWrongQuestionAll = () =>
  useQuery({
    queryKey: ['wrongQuestions'],
    queryFn: () => getWrongQuestionAll(),
  });

const getRecentWrongQuestion = () => api.get<ProblemBrief[]>('/problem/wrong-question/recent');

export const useGetRecentWrongQuestion = () =>
  useQuery({
    queryKey: ['recentWrongQuestions'],
    queryFn: () => getRecentWrongQuestion(),
  });

const getQuestionDetail = (problemId: number) => api.get<ProblemDetail>(`/problem/question/${problemId}`);

export const useGetQuestionDetail = (problemId: number) =>
  useQuery({
    queryKey: ['question', problemId],
    queryFn: () => getQuestionDetail(problemId),
  });

const getProblemArchiveAll = () => api.get<Problem[]>('/problem/archive/all');

export const useGetProblemArchiveAll = () =>
  useQuery({
    queryKey: ['problemArchives'],
    queryFn: () => getProblemArchiveAll(),
  });
