import { useCreateInterviewAnswerLike, useGetInterviewAnswerDetail } from '@/api/interview';
import RouteHeader from '@/components/common/routeheader';
import CommentItem from '@/components/interview/commentItem';
import InputForm from '@/components/interview/inputForm';
import InterviewAnswerItem from '@/components/interview/interviewAnswerItem';
import { useComment } from '@/hooks/useComment';
import { InterviewAnswerDetailResponse } from '@/types/interview';
import convertDate from '@/utils/convertDate';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InterviewAnswerDetail = () => {
  const dummyUser = { email: 'email@gmail.com' };

  const navigate = useNavigate();
  const { interviewId, interviewAnswerId } = useParams();
  const { data: interviewAnswer } = useGetInterviewAnswerDetail(Number(interviewId), Number(interviewAnswerId));
  const [interviewAnswerData, setInterviewAnswerData] = useState<InterviewAnswerDetailResponse>({
    interviewAnswerId: 1,
    memberName: '홍길동',
    date: '2025-01-16T14:28:35.123456789',
    keywords: ['java', 'exception'],
    answer:
      'Checked Exception과 Unchecked Exception은 Java에서 예외를 처리하는 두 가지 주요 방식으로, 컴파일러가 강제하는지 여부에 따라 구분됩니다. Checked Exception은 컴파일러가 try-catch로 처리하거나 throws로 선언할 것을 강제합니다. `IOException`, `SQLException` 등이 그 예입니다. 이를 통해 예측 가능한 오류 처리가 가능하지만, 코드가 다소 장황해질 수 있습니다. Unchecked Exception은 컴파일러가 처리 여부를 강제하지 않으며, 런타임 시 발생합니다. `NullPointerException`, `ArrayIndexOutOfBoundsException` 등이 여기에 해당합니다. 코드가 간결해지지만, 미처 처리되지 않은 오류로 인해 런타임 에러가 발생할 가능성이 있습니다. 결론적으로, Checked Exception은 예측 가능하고 복구 가능한 오류에 적합하며, Unchecked Exception은 프로그래밍 로직 오류나 예외적인 상황에 더 적합합니다. 상황에 따라 적절히 선택하여 사용하는 것이 중요합니다.',
    isLiked: true,
    likeCount: 1000,
    commentCount: 1000,
    commentList: [
      {
        commentId: 1,
        otherMemberName: '홍길원',
        email: 'email@gmail.com',
        comment: '면접 때 도움이 되었습니다. 매우 유용해요 ㅎㅎ',
      },
      {
        commentId: 2,
        email: 'email2@gmail.com',
        otherMemberName: '홍길투',
        comment: '면접 때 도움이 되었습니다.',
      },
    ],
  });

  useEffect(() => {
    if (interviewAnswer) {
      setInterviewAnswerData(interviewAnswer);
    }
  }, [interviewAnswer]);

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
          date={convertDate(interviewAnswerData.date)}
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
          {interviewAnswerData.commentList.map((comment, index) => (
            <div key={index}>
              <CommentItem
                userEmail={dummyUser.email}
                comment={comment}
                handleDelete={handleCommentDelete}
                handleUpdate={handleCommentUpdate}
                onCancelClick={onCancelClick}
                onChange={onCommentChange}
                onConfirmClick={onConfirmClick}
                value={updatedComment?.id === comment.commentId ? updatedComment?.content : comment.comment}
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
