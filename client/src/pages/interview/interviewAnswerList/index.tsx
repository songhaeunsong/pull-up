import { useGetInterviewAnswerList } from '@/api/interview';
import RouteHeader from '@/components/common/routeheader';
import InterviewAnswerItem from '@/components/interview/interviewAnswerItem';
import convertDate from '@/utils/convertDate';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InterviewAnswerList = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const { data: interviewAnswerList } = useGetInterviewAnswerList(Number(interviewId));
  const [interviewAnswerListData, setInterviewAnswerListData] = useState([
    {
      interviewId: 1,
      interviewAnswerId: 1,
      memberName: '홍길동',
      date: '2025-01-16T14:28:35.123456789',
      answer:
        'Checked Exception과 Unchecked Exception은 Java에서 예외를 처리하는 두 가지 주요 방식으로, 컴파일러가 강제하는지 여부에 따라 구분됩니다. Checked Exception은 컴파일러가 try-catch로 처리하거나 throws로 선언할 것을 강제합니다. `IOException`, `SQLException` 등이 그 예입니다. 이를 통해 예측 가능한 오류 처리가 가능하지만, 코드가 다소 장황해질 수 있습니다. Unchecked Exception은 컴파일러가 처리 여부를 강제하지 않으며, 런타임 시 발생합니다. `NullPointerException`, `ArrayIndexOutOfBoundsException` 등이 여기에 해당합니다. 코드가 간결해지지만, 미처 처리되지 않은 오류로 인해 런타임 에러가 발생할 가능성이 있습니다. 결론적으로, Checked Exception은 예측 가능하고 복구 가능한 오류에 적합하며, Unchecked Exception은 프로그래밍 로직 오류나 예외적인 상황에 더 적합합니다. 상황에 따라 적절히 선택하여 사용하는 것이 중요합니다.',
      likeCount: 1000,
      commentCount: 1000,
    },
    {
      interviewId: 1,
      interviewAnswerId: 2,
      memberName: '홍길동',
      date: '2025-01-16T14:28:35.123456789',
      answer:
        'Checked Exception과 Unchecked Exception은 Java에서 예외를 처리하는 두 가지 주요 방식으로, 컴파일러가 강제하는지 여부에 따라 구분됩니다. Checked Exception은 컴파일러가 try-catch로 처리하거나 throws로 선언할 것을 강제합니다. `IOException`, `SQLException` 등이 그 예입니다. 이를 통해 예측 가능한 오류 처리가 가능하지만, 코드가 다소 장황해질 수 있습니다. Unchecked Exception은 컴파일러가 처리 여부를 강제하지 않으며, 런타임 시 발생합니다. `NullPointerException`, `ArrayIndexOutOfBoundsException` 등이 여기에 해당합니다. 코드가 간결해지지만, 미처 처리되지 않은 오류로 인해 런타임 에러가 발생할 가능성이 있습니다. 결론적으로, Checked Exception은 예측 가능하고 복구 가능한 오류에 적합하며, Unchecked Exception은 프로그래밍 로직 오류나 예외적인 상황에 더 적합합니다. 상황에 따라 적절히 선택하여 사용하는 것이 중요합니다.',
      likeCount: 1000,
      commentCount: 1000,
    },
  ]);

  useEffect(() => {
    if (interviewAnswerList) {
      setInterviewAnswerListData(interviewAnswerList);
    }
  }, [interviewAnswerList]);

  const onBackClick = () => {
    navigate(`/interview/result/${interviewId}`);
  };

  const onInterviewAnswerClick = (interviewAnswerId: number) => {
    navigate(`/interview/result/${interviewId}/answers/${interviewAnswerId}`);
  };

  // 좋아요 토글 수정 필요
  const handleLikeClick = (interviewAnswerId: number) => {
    setInterviewAnswerListData((prevData) =>
      prevData.map((data) =>
        data.interviewAnswerId === interviewAnswerId
          ? {
              ...data,
              likeCount: data.likeCount + 1,
            }
          : data,
      ),
    );
  };

  return (
    <div className="h-full bg-Main px-20 py-10">
      <div className="mt-16 flex flex-col gap-9 rounded-2xl border border-primary-200 bg-white p-6">
        <RouteHeader prev="오늘의 질문" title="다른 사람의 답변" onBackClick={onBackClick} />
        <div className="flex flex-col gap-6">
          {interviewAnswerListData.length > 0 ? (
            interviewAnswerListData.map((data, id) => (
              <InterviewAnswerItem
                key={id}
                id={data.interviewAnswerId}
                userName={data.memberName}
                content={data.answer}
                date={convertDate(data.date)}
                likeCount={data.likeCount}
                commentCount={data.commentCount}
                liked={false}
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

export default InterviewAnswerList;
