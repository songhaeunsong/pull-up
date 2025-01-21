import { useQuery } from '@tanstack/react-query';
import api from './instance';
import { Exam } from '@/types/exam';
import { CorrectRate, Score } from '@/types/chart';

interface GetExamAllResponse {
  content: Exam[];
  pageable: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
}

const getScore = () => api.get<Score[]>('/exam/me/score');

export const useGetScore = () =>
  useQuery({
    queryKey: ['scores'],
    queryFn: () => getScore(),
  });

const getCorrectRate = () => api.get<CorrectRate[]>('/exam/me/correct-rate');

export const useGetCorrectRate = () =>
  useQuery({
    queryKey: ['correctRates'],
    queryFn: () => getCorrectRate(),
  });

const getExamAll = () => api.get<GetExamAllResponse>('/exam/me/all');

export const useGetExamAll = () =>
  useQuery({
    queryKey: ['correctRates'],
    queryFn: () => getExamAll(),
  });

const getRecentExam = () => api.get<Exam>('/exam/me/recent');

export const useGetRecentExam = () =>
  useQuery({
    queryKey: ['correctRates'],
    queryFn: () => getRecentExam(),
  });
