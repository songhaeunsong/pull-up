import { useGetComments } from '@/api/comment';
import { useCreateInterviewAnswerLike } from '@/api/interview';
import RouteHeader from '@/components/common/routeheader';
import CommentItem from '@/components/interview/commentItem';
import InputForm from '@/components/interview/inputForm';
import InterviewAnswerItem from '@/components/interview/interviewAnswerItem';
import { useComment } from '@/hooks/useComment';
import { memberStore } from '@/stores/memberStore';
import { Comment } from '@/types/interview';
import convertDate from '@/utils/convertDate';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const InterviewAnswerDetail = () => {
  const { member } = memberStore();
  const navigate = useNavigate();
  const { interviewId, interviewAnswerId } = useParams();
  const location = useLocation();
  const interviewAnswerData = location.state?.interviewAnswerData;

  const { data: comments, isLoading: isCommentsLoading } = useGetComments(Number(interviewAnswerId));
  const [commentsData, setCommentsData] = useState<Comment[]>();

  // 댓글 훅
  const {
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
  } = useComment({ interviewAnswerId: Number(interviewAnswerId) });

  const likeMutation = useCreateInterviewAnswerLike(Number(interviewId), Number(interviewAnswerId));
  const handleLikeClick = () => {
    likeMutation.mutate();
  };

  useEffect(() => {
    if (!isCommentsLoading) {
      setCommentsData(comments);
    }
  }, [comments, isCommentsLoading]);

  if (!member || !interviewAnswerData || !commentsData) {
    return null;
  }

  const onBackClick = () => {
    navigate(`/interview/result/${interviewId}/answers`);
  };

  return (
    <div className="min-h-full bg-Main px-6 py-10 md:px-10 xl:px-20">
      <div className="mt-[94px] flex flex-col gap-4 rounded-2xl sm:mt-16 md:gap-6 md:border md:border-primary-200 md:bg-white md:p-6">
        <RouteHeader prev="다른 사람의 답변 목록" title="답변 상세 보기" onBackClick={onBackClick} />
        <InterviewAnswerItem
          id={interviewAnswerData.interviewAnswerId}
          userName={interviewAnswerData.memberName}
          content={interviewAnswerData.answer}
          keywords={interviewAnswerData.keywords}
          date={convertDate(interviewAnswerData.createdAt)}
          likeCount={interviewAnswerData.likeCount}
          commentCount={interviewAnswerData.commentCount}
          liked={interviewAnswerData.isLiked}
          handleLikeClick={handleLikeClick}
        />
        <InputForm
          id="answerComment"
          placeholder="댓글을 입력하세요"
          value={inputValue}
          onChange={onChange}
          onSubmit={onSubmit}
          onKeyDown={onKeyDown}
        />
        <div>
          {commentsData.map((comment, index) => (
            <div key={index}>
              <CommentItem
                userEmail={member.email}
                comment={comment}
                handleDelete={handleCommentDelete}
                handleUpdate={handleCommentUpdate}
                onCancelClick={onCancelClick}
                onChange={onCommentChange}
                onConfirmClick={onConfirmClick}
                value={updatedComment?.id === comment.commentId ? updatedComment?.content : comment.content}
                updated={updatedComment?.id === comment.commentId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default InterviewAnswerDetail;
