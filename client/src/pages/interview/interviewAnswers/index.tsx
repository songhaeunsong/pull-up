import { useCreateInterviewAnswerLike, useGetInterviewAnswers } from '@/api/interview';
import RouteHeader from '@/components/common/routeheader';
import InterviewAnswerItem from '@/components/interview/interviewAnswerItem';
import Page404 from '@/pages/404';
import { InterviewAnswer } from '@/types/interview';
import convertDate from '@/utils/convertDate';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InterviewAnswersPage = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const { data: getInterviewAnswers, isLoading } = useGetInterviewAnswers(Number(interviewId));
  const [interviewAnswersData, setInterviewAnswersData] = useState<InterviewAnswer[]>();
  const likeMutation = useCreateInterviewAnswerLike(Number(interviewId));

  useEffect(() => {
    if (!isLoading) {
      setInterviewAnswersData(getInterviewAnswers);
    }
  }, [getInterviewAnswers, isLoading]);

  if (!interviewAnswersData) {
    return <Page404 />;
  }

  // 결과로 돌아가기
  const onBackClick = () => {
    navigate(-1);
  };

  // 답변 상세 보기
  const onInterviewAnswerClick = (interviewAnswerId: number) => {
    navigate(`/interview/${interviewId}/answers/${interviewAnswerId}`);
  };

  // 좋아요 토글
  const handleLikeClick = (interviewAnswerId: number) => {
    likeMutation(interviewAnswerId);
    console.log('좋아요 호출: ', interviewAnswerId);
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
