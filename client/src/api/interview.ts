import { useMutation, useQuery } from '@tanstack/react-query';
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
import { queryClient } from '@/main';

type GetStreakResponse = Streak[];

const getStreak = () => api.get<GetStreakResponse>('interview/me/streak');

export const useGetStreak = () =>
  useQuery({
    queryKey: ['streak'],
    queryFn: () => getStreak(),
  });

// 오늘의 문제 조회
const getInterview = (): Promise<InterviewResponse> => {
  const data = api.get('interview').json<InterviewResponse>();
  return data;
};

export const useGetInterview = () => {
  return useQuery({
    queryKey: ['interview'],
    queryFn: getInterview,
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 60, // 1시간
  });
};

// 답안 제출
export const createMemberAnswer = async (id: number, answer: string): Promise<MemberAnswerRequest> => {
  const data = await api.post(`interview/${id}`, { json: { answer } }).json<MemberAnswerRequest>();
  return data;
};

// 결과 조회
const getInterviewResult = (interviewAnswerId: number): Promise<InterviewResultResponse> => {
  const data = api.get(`interview/result/${interviewAnswerId}`).json<InterviewResultResponse>();
  return data;
};

export const useGetInterviewResult = (interviewAnswerId: number) => {
  return useQuery({
    queryKey: ['result', interviewAnswerId],
    queryFn: () => getInterviewResult(interviewAnswerId),
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 60, // 1시간
  });
};

// 지난 오늘의 문제 전체 조회
const getInterviewList = (): Promise<InterviewListResponse[]> => {
  const data = api.get('interview/me').json<InterviewListResponse[]>();
  return data;
};

export const useGetInterviewList = () => {
  return useQuery({
    queryKey: ['interviewList'],
    queryFn: getInterviewList,
  });
};

// 다른 사람 답변 전체 조회
const getInterviewAnswerList = (interviewId: number): Promise<InterviewAnswerListResponse[]> => {
  const data = api.get(`interview/${interviewId}/all`).json<InterviewAnswerListResponse[]>();
  return data;
};

export const useGetInterviewAnswerList = (interviewId: number) => {
  return useQuery({
    queryKey: ['interviewAnswerList', interviewId],
    queryFn: () => getInterviewAnswerList(interviewId),
  });
};

// 다른 사람 답변 상세 조회
const getInterviewAnswerDetail = (
  interviewId: number,
  interviewAnswerId: number,
): Promise<InterviewAnswerDetailResponse> => {
  const data = api.get(`interview/${interviewId}/${interviewAnswerId}`).json<InterviewAnswerDetailResponse>();
  return data;
};

export const useGetInterviewAnswerDetail = (interviewId: number, interviewAnswerId: number) => {
  return useQuery({
    queryKey: ['interviewAnswerDetail', interviewAnswerId],
    queryFn: () => getInterviewAnswerDetail(interviewId, interviewAnswerId),
  });
};

// 다른 사람 답변 좋아요
const createInterviewAnswerLike = async (interviewAnswerId: number): Promise<LikeResponse> => {
  const data = await api.post(`interview/${interviewAnswerId}/like`).json<LikeResponse>();
  return data;
};

export const useCreateInterviewAnswerLike = (interviewId: number, interviewAnswerId: number) => {
  return useMutation({
    mutationFn: () => createInterviewAnswerLike(interviewAnswerId),
    onMutate: async () => {
      // 쿼리 취소
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['interviewAnswerList', interviewId] }),
        queryClient.cancelQueries({ queryKey: ['interviewAnswerDetail', interviewAnswerId] }),
      ]);

      // 쿼리의 이전 데이터 저장
      const previousListData = queryClient.getQueryData(['interviewAnswerList', interviewId]);
      const previousDetailData = queryClient.getQueryData(['interviewAnswerDetail', interviewAnswerId]);

      // 데이터 업데이트
      if (previousListData) {
        queryClient.setQueryData(['interviewAnswerList', interviewId], (old: InterviewAnswerListResponse[]) =>
          old?.map((answer) =>
            answer.interviewAnswerId === interviewAnswerId
              ? {
                  ...answer,
                  isLiked: !answer.isLiked,
                  likeCount: answer.isLiked ? answer.likeCount - 1 : answer.likeCount + 1,
                }
              : answer,
          ),
        );
      }

      if (previousDetailData) {
        queryClient.setQueryData(
          ['interviewAnswerDetail', interviewAnswerId],
          (old: InterviewAnswerDetailResponse) => ({
            ...old,
            isLiked: !old.isLiked,
            likeCount: old.isLiked ? old.likeCount - 1 : old.likeCount + 1,
          }),
        );
      }

      return { previousListData, previousDetailData };
    },
    onError: (err, _, context) => {
      // 에러 시 데이터 롤백
      if (context?.previousListData) {
        console.error('좋아요 요청을 실패했습니다.', err);
        queryClient.setQueryData(['interviewAnswerList', interviewId], context.previousListData);
      }
      if (context?.previousDetailData) {
        queryClient.setQueryData(['interviewAnswerDetail', interviewAnswerId], context.previousDetailData);
      }
    },
    onSettled: () => {
      // 쿼리 모두 무효화
      queryClient.invalidateQueries({ queryKey: ['interviewAnswerList', interviewId] });
      queryClient.invalidateQueries({ queryKey: ['interviewAnswerDetail', interviewAnswerId] });
    },
  });
};
