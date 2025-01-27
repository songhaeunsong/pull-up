import { useQuery } from '@tanstack/react-query';
import api from './instance';
import { Exam, ExamCreateRequest, ExamDetailsResponse, ExamResultRequest, ExamResultResponse } from '@/types/exam';
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

// 모의고사 생성
export const postExam = async (data: ExamCreateRequest) => {
  return await api.post('/exam/me', { json: data }).json<{ examId: number }>();
};

// 모의고사 조회
const getExamDetails = (examId: number) => {
  return api.get(`exam/${examId}`).json<{ examDetailsDtos: ExamDetailsResponse }>();
};

export const useGetExamDetails = (examId: number) => {
  return useQuery({
    queryKey: ['examDetails', examId],
    queryFn: async () => {
      const response = await getExamDetails(examId);
      return response.examDetailsDtos;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// 모의고사 답안 제출
export const postExamAnswer = async (examId: number, data: ExamResultRequest) => {
  return await api.post(`exam/${examId}`, { json: { data } });
};

// 모의고사 채점 결과 조회
export const getExamResult = (examId: number) => {
  return api.get(`exam/${examId}/result`).json<ExamResultResponse>();
};

export const useGetExamResult = (examId: number) => {
  return useQuery({
    queryKey: ['examResult', examId],
    queryFn: () => getExamResult(examId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
