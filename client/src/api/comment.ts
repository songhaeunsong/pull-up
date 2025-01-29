import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import api from './instance';
import { CommentRequest } from '@/types/interview';
import { CreateResponse } from '@/types/common';

// 댓글 작성
const createComment = async (interviewAnswerId: number, comment: CommentRequest): Promise<CreateResponse> => {
  const data = await api.post(`interview/${interviewAnswerId}/comment`, { json: { comment } }).json<CreateResponse>();
  return data;
};

export const useCreateComment = (interviewAnswerId: number, comment: CommentRequest) => {
  return useMutation<CreateResponse, Error, void>({
    mutationFn: () => createComment(interviewAnswerId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['interviewAnswerDetail', interviewAnswerId],
      });
    },
  });
};

// 댓글 수정
const updateComment = async (interviewAnswerId: number, commentId: number, comment: string): Promise<void> => {
  return await api.patch(`interview//${interviewAnswerId}/comment/${commentId}`, { json: { comment } }).json();
};

export const useUpdateComment = (interviewAnswerId: number, commentId: number, comment: string) => {
  return useMutation<void, Error, void>({
    mutationFn: () => updateComment(interviewAnswerId, commentId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['interviewAnswerDetail', interviewAnswerId],
      });
    },
  });
};

// 댓글 삭제
const deleteComment = async (interviewAnswerId: number, commentId: number) => {
  return await api.delete(`interview/${interviewAnswerId}/comment/${commentId}`);
};

export const useDeleteComment = (interviewAnswerId: number) => {
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(interviewAnswerId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['interviewAnswerDetail', interviewAnswerId],
      });
    },
  });
};
