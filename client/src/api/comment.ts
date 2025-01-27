import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import api from './instance';
import { CommentRequest } from '@/types/interview';
import { CreateResponse } from '@/types/common';

// 댓글 작성
const createComment = async (
  interviewId: number,
  interviewAnswerId: number,
  comment: CommentRequest,
): Promise<CreateResponse> => {
  const data = await api
    .post(`interview/${interviewId}/${interviewAnswerId}/comment`, { json: { comment } })
    .json<CreateResponse>();
  return data;
};

export const useCreateComment = (interviewId: number, interviewAnswerId: number, comment: CommentRequest) => {
  return useMutation<CreateResponse, Error, void>({
    mutationKey: ['comment', interviewId, interviewAnswerId],
    mutationFn: () => createComment(interviewId, interviewAnswerId, comment),
    onSuccess: () => {
      // 답변 상세 조회 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['interviewAnswerDetail', interviewId, interviewAnswerId],
      });
    },
  });
};

// 댓글 수정
const updateComment = async (
  interviewId: number,
  interviewAnswerId: number,
  commentId: number,
  comment: string,
): Promise<void> => {
  return await api
    .patch(`interview/${interviewId}/${interviewAnswerId}/comment/${commentId}`, { json: { comment } })
    .json();
};

export const useUpdateComment = (
  interviewId: number,
  interviewAnswerId: number,
  commentId: number,
  comment: string,
) => {
  return useMutation<void, Error, void>({
    mutationKey: ['updateComment', commentId],
    mutationFn: () => updateComment(interviewId, interviewAnswerId, commentId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['interviewAnswerDetail', interviewId, interviewAnswerId],
      });
    },
  });
};

// 댓글 삭제
const deleteComment = async (interviewId: number, interviewAnswerId: number, commentId: number) => {
  return await api.delete(`interview/${interviewId}/${interviewAnswerId}/comment/${commentId}`);
};

export const useDeleteComment = (interviewId: number, interviewAnswerId: number) => {
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(interviewId, interviewAnswerId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['interviewAnswerDetail', interviewId, interviewAnswerId],
      });
    },
  });
};
