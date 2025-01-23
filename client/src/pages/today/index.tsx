import { postInterviewAnswer, useGetInterview } from '@/api/interview';
import InputForm from '@/components/today/inputform';
import QuestionCard from '@/components/today/questioncard';
import { InterviewResponse } from '@/types/interview';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TodayPage = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(''); // 답변
  const [hint, setHint] = useState(false);
  const { data: interview } = useGetInterview();
  const [data, setData] = useState<InterviewResponse>();

  // 더미데이터
  const username = '김싸피';

  useEffect(() => {
    if (!interview) {
      setData({
        interviewId: 1,
        question: 'Checked Exception과 Unchecked Exception의 차이는 ?',
        keywords: ['Java', 'Exception'],
      });
    } else {
      setData(interview);
    }
  }, []);

  if (!data) return null;

  const onHintClick = () => {
    setHint(!hint);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const onSubmit = async () => {
    if (!answer) {
      alert('답안을 입력하세요.');
      return;
    }

    const response = await postInterviewAnswer(data.interviewId, answer);
    navigate(`/today/result/${response.interviewAnswerId}`);

    console.log('제출 답안: ', answer);
    setAnswer('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-gradient-to-b from-primary-50 to-white px-10 py-10">
      <div className="flex w-[873px] flex-col items-center justify-center gap-12">
        <div className="text-3xl font-extrabold">
          <span className="text-primary-600">{`${username}`}</span>
          <span>님 만을 위한 오늘의 맞춤 문제🎯</span>
        </div>
        <QuestionCard title={data.question} keywords={data.keywords} hint={hint} onHintClick={onHintClick} />
        <div className="flex w-full flex-col justify-start gap-2">
          <span className="text-xl font-semibold">나의 답변</span>
          <InputForm
            id="todayQuestion"
            placeholder="질문에 대한 답을 남겨주세요."
            value={answer}
            limit={500}
            onChange={onChange}
            onSubmit={onSubmit}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default TodayPage;
