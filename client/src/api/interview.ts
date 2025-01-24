import { useQuery } from '@tanstack/react-query';
import api from './instance';
import { Streak } from '@/types/chart';
import {
  InterviewAnswerDetailResponse,
  InterviewAnswerListResponse,
  InterviewListResponse,
  InterviewResponse,
  InterviewResultResponse,
  MemberAnswerRequest,
} from '@/types/interview';
import { LikeResponse } from '@/types/common';

type GetStreakResponse = Streak[];

const getStreak = () => api.get<GetStreakResponse>('interview/me/streak');

export const useGetStreak = () =>
  useQuery({
    queryKey: ['streak'],
    queryFn: () => getStreak(),
  });

// 오늘의 문제 조회
const getInterview = () => {
  const data = api.get('interview').json<InterviewResponse>();
  return data;
};

export const useGetInterview = () => {
  return useQuery({
    queryKey: ['interview'],
    queryFn: getInterview,
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 60, // 1시간
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// 답안 제출
export const createMemberAnswer = async (id: number, answer: string) => {
  const data = await api.post(`interview/${id}`, { json: { answer } }).json<MemberAnswerRequest>();
  return data;
};

// 결과 조회
const getInterviewResult = (interviewAnswerId: number) => {
  const data = api.get(`interview/result/${interviewAnswerId}`).json<InterviewResultResponse>();
  return data;
};

export const useGetInterviewResult = (interviewAnswerId: number) => {
  return useQuery({
    queryKey: ['result', interviewAnswerId],
    queryFn: () => getInterviewResult(interviewAnswerId),
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 60, // 1시간
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// 지난 오늘의 문제 전체 조회
const getInterviewList = () => {
  const data = api.get('interview/me').json<InterviewListResponse>();
  return data;
};

export const useGetInterviewList = () => {
  return useQuery({
    queryKey: ['interviewList'],
    queryFn: getInterviewList,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// 다른 사람 답변 전체 조회
const getInterviewAnswerList = (interviewId: number) => {
  const data = api.get(`interview/${interviewId}/all`).json<InterviewAnswerListResponse>();
  return data;
};

export const useGetInterviewAnswerList = (interviewId: number) => {
  return useQuery({
    queryKey: ['interviewAnswerList', interviewId],
    queryFn: () => getInterviewAnswerList(interviewId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// 다른 사람 답변 상세 조회
const getInterviewAnswerDetail = (interviewId: number, interviewAnswerId: number) => {
  const data = api.get(`interview/${interviewId}/${interviewAnswerId}`).json<InterviewAnswerDetailResponse>();
  return data;
};

export const useGetInterviewAnswerDetail = (interviewId: number, interviewAnswerId: number) => {
  return useQuery({
    queryKey: ['interviewAnswerDetail', interviewId, interviewAnswerId],
    queryFn: () => getInterviewAnswerDetail(interviewId, interviewAnswerId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// 다른 사람 답변 좋아요 토글
const createLike = (interviewAnswerId: number) => {
  const data = api.get(`interview/${interviewAnswerId}/like`).json<LikeResponse>();
  return data;
};

export const useCreateLike = (interviewAnswerId: number, liked: number) => {
  return;
};
