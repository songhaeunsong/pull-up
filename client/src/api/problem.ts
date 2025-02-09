import { ProblemBrief, ProblemDetail } from '@/types/problem';
import api from './instance';
import { useQuery } from '@tanstack/react-query';
import { GetArchivedProblemAllResponse, GetWrongProblemAllResponse } from '@/types/response/problems';

// 내가 틀린 문제 최근 전체 조회
const getWrongProblemAll = () => api.get<GetWrongProblemAllResponse>('problem/me/all').json();

export const useGetWrongProblemAll = () =>
  useQuery({
    queryKey: ['wrongProblems'],
    queryFn: () => getWrongProblemAll(),
  });

// 내가 틀린 문제 최근 10건 조회
const getRecentWrongProblem = () => api.get<ProblemBrief[]>('problem/wrong/recent').json();
export const useGetRecentWrongProblem = () =>
  useQuery({
    queryKey: ['recentWrongProblems'],
    queryFn: () => getRecentWrongProblem(),
  });

// 문제 단건 조회
const getProblemDetail = (problemId: number) => api.get<ProblemDetail>(`problem/${problemId}`).json();

export const useGetProblemDetail = (problemId: number) =>
  useQuery({
    queryKey: ['problemDetail', problemId],
    queryFn: () => getProblemDetail(problemId),
  });

// 북마크 문제 전체 조회
const getArchivedProblemAll = () => api.get<GetArchivedProblemAllResponse>('problem/archive/all').json();

export const useGetArchivedProblemAll = () =>
  useQuery({
    queryKey: ['archivedProblems'],
    queryFn: () => getArchivedProblemAll(),
  });

// 문제 북마크
export const toggleProblemBookmark = async (problemId: number) => {
  await api.post(`problem/${problemId}`);
};
