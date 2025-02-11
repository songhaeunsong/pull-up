import { useCreateInterviewAnswerLike, useGetInterviewAnswers } from '@/api/interview';
import RouteHeader from '@/components/common/routeheader';
import InterviewAnswerItem from '@/components/interview/interviewAnswerItem';
import { memberStore } from '@/stores/memberStore';
import { InterviewAnswer } from '@/types/interview';
import convertDate from '@/utils/convertDate';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InterviewAnswersPage = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const { interviewAnswerId } = memberStore();
  const { data: getInterviewAnswers, isLoading } = useGetInterviewAnswers(interviewAnswerId);
  const [interviewAnswersData, setInterviewAnswersData] = useState<InterviewAnswer[]>();

  const [likeId, setLikeId] = useState<number>();
  const likeMutation = useCreateInterviewAnswerLike(interviewAnswerId, Number(likeId));

  useEffect(() => {
    if (!isLoading) {
      setInterviewAnswersData(getInterviewAnswers);
    }
  }, [getInterviewAnswers, isLoading]);

  if (!interviewAnswersData) {
    return null;
  }

  const onBackClick = () => {
    navigate(`/interview/result/${interviewId}`);
  };

  const onInterviewAnswerClick = (interviewAnswerId: number) => {
    navigate(`/interview/result/${interviewId}/answers/${interviewAnswerId}`);
  };

  // 좋아요 토글
  const handleLikeClick = (interviewAnswerId: number) => {
    setLikeId(interviewAnswerId);
    console.log(interviewAnswerId);
    likeMutation.mutate();
  };

  return (
    <div className="min-h-full bg-Main px-6 py-10 md:px-10 xl:px-20">
      <div className="mt-[94px] flex flex-col gap-6 rounded-2xl sm:mt-16 md:gap-9 md:border md:border-primary-200 md:bg-white md:p-6">
        <RouteHeader prev="오늘의 질문" title="다른 사람의 답변" onBackClick={onBackClick} />
        <div className="flex flex-col gap-6">
          {interviewAnswersData.length > 0 ? (
            interviewAnswersData.map((data, id) => (
              <InterviewAnswerItem
                key={id}
                id={data.interviewAnswerId}
                userName={data.memberName}
                content={data.answer}
                date={convertDate(data.createdAt)}
                likeCount={data.likeCount}
                commentCount={data.commentCount}
                liked={data.isLiked}
                handleLikeClick={handleLikeClick}
                onInterviewAnswerClick={onInterviewAnswerClick}
              />
            ))
          ) : (
            <div>다른 사람의 답변이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewAnswersPage;
