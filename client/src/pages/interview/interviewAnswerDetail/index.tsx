import { useGetComments } from '@/api/comment';
import { useCreateInterviewAnswerLike, useGetInterviewAnswerDetail } from '@/api/interview';
import RouteHeader from '@/components/common/routeheader';
import CommentItem from '@/components/interview/commentItem';
import InputForm from '@/components/interview/inputForm';
import InterviewAnswerItem from '@/components/interview/interviewAnswerItem';
import { useComment } from '@/hooks/useComment';
import Page404 from '@/pages/404';
import { memberStore } from '@/stores/memberStore';
import { Comment } from '@/types/comment';
import { InterviewAnswer } from '@/types/interview';
import convertDate from '@/utils/convertDate';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InterviewAnswerDetail = () => {
  const { member } = memberStore.getState();
  const navigate = useNavigate();
  const { interviewId, interviewAnswerId } = useParams();
  const { data: interviewAnswer, isLoading: isAnswerLoading } = useGetInterviewAnswerDetail(Number(interviewAnswerId));
  const [interviewAnswerData, setInterviewAnswerData] = useState<InterviewAnswer>();
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

  const likeMutation = useCreateInterviewAnswerLike(Number(interviewId));

  useEffect(() => {
    if (!isAnswerLoading && interviewAnswer) {
      setInterviewAnswerData(interviewAnswer);
    }
    if (!isCommentsLoading && comments) {
      setCommentsData(comments);
    }
  }, [interviewAnswer, isAnswerLoading, comments, isCommentsLoading]);

  // 다른 사람 답변 목록으로 돌아가기
  const onBackClick = () => {
    navigate(-1);
  };

  // 좋아요 토글
  const handleLikeClick = () => {
    likeMutation(Number(interviewAnswerId));
    console.log('좋아요: ', interviewAnswer?.isLiked);
  };

  if (!member || !interviewAnswerData || !commentsData) {
    return <Page404 />;
  }

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
          {commentsData && commentsData.length > 0 ? (
            commentsData.map((comment, index) => (
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
            ))
          ) : (
            <div>댓글 목록이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default InterviewAnswerDetail;
