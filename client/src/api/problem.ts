import { Problem, ProblemBrief, ProblemDetail } from '@/types/problem';
import api from './instance';
import { useQuery } from '@tanstack/react-query';

// 틀린 문제 전체 조회
interface GetWrongProblemAllResponse {
  wrongProblemDtos: Problem[];
}

// 아카이브 문제 전체 조회
interface GetArchivedProblemAllResponse {
  bookmarkedProblemDtos: Problem[];
}

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
