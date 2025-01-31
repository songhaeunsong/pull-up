import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import api from './instance';
import { CommentRequest, InterviewAnswerDetailResponse } from '@/types/interview';
import { CreateResponse } from '@/types/common';

// 댓글 작성
const createComment = async (interviewAnswerId: number, comment: CommentRequest): Promise<CreateResponse> => {
  const data = await api.post(`interview/${interviewAnswerId}/comment`, { json: { comment } }).json<CreateResponse>();
  return data;
};

export const useCreateComment = (interviewAnswerId: number, comment: CommentRequest) => {
  return useMutation({
    mutationFn: () => createComment(interviewAnswerId, comment),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['interviewAnswerDetail', interviewAnswerId] });

      const previousData = queryClient.getQueryData(['interviewAnswerDetail', interviewAnswerId]);

      queryClient.setQueryData(['interviewAnswerDetail', interviewAnswerId], (old: InterviewAnswerDetailResponse) => ({
        ...old,
        commentList: [
          ...old.commentList,
          {
            commentId: 0,
            otherMemberName: '작성자',
            email: '이메일',
            comment: comment.comment,
          },
        ],
        commentCount: old.commentCount + 1,
      }));

      return { previousData };
    },
    onError: (err, _, context) => {
      if (context?.previousData) {
        console.error('댓글 작성 요청을 실패했습니다.', err);
        queryClient.setQueryData(['interviewAnswerDetail', interviewAnswerId], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['interviewAnswerDetail', interviewAnswerId],
      });
    },
  });
};

// 댓글 수정
const updateComment = async (interviewAnswerId: number, commentId: number, comment: string): Promise<void> => {
  return await api.patch(`interview/${interviewAnswerId}/comment/${commentId}`, { json: { comment } }).json();
};

export const useUpdateComment = (interviewAnswerId: number, commentId: number, comment: string) => {
  return useMutation({
    mutationFn: () => updateComment(interviewAnswerId, commentId, comment),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['interviewAnswerDetail', interviewAnswerId] });

      const previousData = queryClient.getQueryData(['interviewAnswerDetail', interviewAnswerId]);

      queryClient.setQueryData(['interviewAnswerDetail', interviewAnswerId], (old: InterviewAnswerDetailResponse) => ({
        ...old,
        commentList: old.commentList.map((item) => (item.commentId === commentId ? { ...item, item: comment } : item)),
      }));

      return { previousData };
    },
    onError: (err, _, context) => {
      if (context?.previousData) {
        console.error('댓글 수정 요청을 실패했습니다.', err);
        queryClient.setQueryData(['interviewAnswerDetail', interviewAnswerId], context.previousData);
      }
    },
    onSettled: () => {
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
    onMutate: async (commentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['interviewAnswerDetail', interviewAnswerId] });

      const previousData = queryClient.getQueryData(['interviewAnswerDetail', interviewAnswerId]);

      queryClient.setQueryData(['interviewAnswerDetail', interviewAnswerId], (old: InterviewAnswerDetailResponse) => ({
        ...old,
        commentList: old.commentList.filter((comment) => comment.commentId !== commentId),
      }));

      return { previousData };
    },
    onError: (err, _, context) => {
      if (context?.previousData) {
        console.error('댓글 삭제 요청을 실패했습니다.', err);
        queryClient.setQueryData(['interviewAnswerDetail', interviewAnswerId], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['interviewAnswerDetail', interviewAnswerId],
      });
    },
  });
};
