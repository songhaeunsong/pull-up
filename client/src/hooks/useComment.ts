import { useCreateComment, useDeleteComment, useUpdateComment } from '@/api/comment';
import { useState } from 'react';

interface useCommentProps {
  interviewAnswerId: number;
}

export const useComment = ({ interviewAnswerId }: useCommentProps) => {
  // 댓글 작성
  const [inputValue, setInputValue] = useState('');
  const createCommentMutation = useCreateComment({
    interviewAnswerId: interviewAnswerId,
    content: inputValue,
  });

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async () => {
    createCommentMutation.mutate();
    setInputValue('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  // 댓글 수정
  const [updatedComment, setUpdatedComment] = useState<{
    id: number;
    content: string;
  }>();
  const updateCommentMutation = useUpdateComment(
    interviewAnswerId,
    Number(updatedComment?.id),
    updatedComment?.content ?? '',
  );

  // 댓글 수정 활성화
  const handleCommentUpdate = (comment: string, commentId: number) => {
    setUpdatedComment({ id: commentId, content: comment });
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>, commentId: number) => {
    setUpdatedComment((prev) => ({
      ...prev,
      id: commentId,
      content: e.target.value,
    }));
  };

  // 수정 취소
  const onCancelClick = () => {
    setUpdatedComment({ id: 0, content: '' });
  };

  // 수정 완료
  const onConfirmClick = async () => {
    updateCommentMutation.mutate();
    setUpdatedComment({ id: 0, content: '' });
  };

  // 댓글 삭제
  const deleteCommentMutation = useDeleteComment(interviewAnswerId);
  const handleCommentDelete = async (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  return {
    inputValue,
    updatedComment,
    onChange,
    onSubmit,
    onKeyDown,
    handleCommentUpdate,
    onCommentChange,
    onCancelClick,
    onConfirmClick,
    handleCommentDelete,
  };
};
