import { queryClient } from '@/main';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from './instance';
import { Comment, CommentRequest, InterviewAnswer } from '@/types/interview';
import { CreateResponse } from '@/types/common';
import { now } from 'lodash';
import { memberStore } from '@/stores/memberStore';

// 댓글 전체 조회
const getComments = async (interviewAnswerId: number) => {
  const data = await api.get(`interview/${interviewAnswerId}/comment/all`).json<Comment[]>();
  return data;
};

export const useGetComments = (interviewAnswerId: number) => {
  return useQuery({
    queryKey: ['comments', interviewAnswerId],
    queryFn: () => getComments(interviewAnswerId),
  });
};

// 댓글 작성
const createComment = async (comment: CommentRequest): Promise<CreateResponse> => {
  const data = await api
    .post(`interview/${comment.interviewAnswerId}/comment`, { json: { comment } })
    .json<CreateResponse>();
  return data;
};

export const useCreateComment = (comment: CommentRequest) => {
  return useMutation({
    mutationFn: () => createComment(comment),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['interviewAnswerDetail', comment.interviewAnswerId] });
      await queryClient.cancelQueries({ queryKey: ['commnets', comment.interviewAnswerId] });

      const previousAnswers = queryClient.getQueryData(['interviewAnswerDetail', comment.interviewAnswerId]);
      const previousComments = queryClient.getQueryData(['comments', comment.interviewAnswerId]);

      queryClient.setQueryData(['interviewAnswerDetail', comment.interviewAnswerId], (old: InterviewAnswer) => ({
        ...old,
        commentCount: old.commentCount + 1,
      }));
      queryClient.setQueryData(['comments', comment.interviewAnswerId], (old: Comment[]) => [
        ...old,
        {
          commentId: 0,
          writer: memberStore().member?.name,
          email: memberStore().member?.email,
          content: comment.content,
          createdAt: now(),
        },
      ]);

      return { previousAnswers, previousComments };
    },
    onError: (err, _, context) => {
      if (context?.previousAnswers || context?.previousComments) {
        console.error('댓글 작성 요청을 실패했습니다.', err);
        queryClient.setQueryData(['interviewAnswerDetail', comment.interviewAnswerId], context.previousAnswers);
        queryClient.setQueryData(['comments', comment.interviewAnswerId], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['interviewAnswerDetail', comment.interviewAnswerId],
      });
      queryClient.invalidateQueries({
        queryKey: ['comments', comment.interviewAnswerId],
      });
    },
  });
};

// 댓글 수정
const updateComment = async (commentId: number, comment: string): Promise<void> => {
  return await api.patch(`interview/interview-answer/comment/${commentId}`, { json: { comment } }).json();
};

export const useUpdateComment = (interviewAnswerId: number, commentId: number, comment: string) => {
  return useMutation({
    mutationFn: () => updateComment(commentId, comment),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['comments', interviewAnswerId] });

      const previousData = queryClient.getQueryData(['comments', interviewAnswerId]);

      queryClient.setQueryData(['comments', interviewAnswerId], (old: Comment[]) =>
        old.map((c: Comment) => (c.commentId === commentId ? { ...c, content: comment } : c)),
      );

      return { previousData };
    },
    onError: (err, _, context) => {
      if (context?.previousData) {
        console.error('댓글 수정 요청을 실패했습니다.', err);
        queryClient.setQueryData(['comments', interviewAnswerId], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', interviewAnswerId],
      });
    },
  });
};

// 댓글 삭제
const deleteComment = async (commentId: number) => {
  return await api.delete(`interview/interview-answer/comment/${commentId}`);
};

export const useDeleteComment = (interviewAnswerId: number) => {
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onMutate: async (commentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['interviewAnswerDetail', interviewAnswerId] });
      await queryClient.cancelQueries({ queryKey: ['comments', interviewAnswerId] });

      const previousAnswer = queryClient.getQueryData(['interviewAnswerDetail', interviewAnswerId]);
      const previousComment = queryClient.getQueryData(['comments', interviewAnswerId]);

      queryClient.setQueryData(['interviewAnswerDetail', interviewAnswerId], (old: InterviewAnswer) => ({
        ...old,
        commentCount: old.commentCount - 1,
      }));
      queryClient.setQueryData(['comments', interviewAnswerId], (old: Comment[]) =>
        old.filter((c: Comment) => c.commentId !== commentId),
      );

      return { previousAnswer, previousComment };
    },
    onError: (err, _, context) => {
      if (context?.previousAnswer || context?.previousComment) {
        console.error('댓글 삭제 요청을 실패했습니다.', err);
        queryClient.setQueryData(['interviewAnswerDetail', interviewAnswerId], context.previousAnswer);
        queryClient.setQueryData(['comments', interviewAnswerId], context.previousComment);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['interviewAnswerDetail', interviewAnswerId],
      });
      queryClient.invalidateQueries({
        queryKey: ['comments', interviewAnswerId],
      });
    },
  });
};
