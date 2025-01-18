import InputForm from '@/components/today/inputform';
import QuestionCard from '@/components/today/questioncard';
import { useState } from 'react';

const TodayPage = () => {
  const [value, setValue] = useState(''); // 답변
  const [hint, setHint] = useState(false);

  const onHintClick = () => {
    setHint(!hint);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    console.log('제출 답안: ', value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  // 더미데이터
  const username = '김싸피';
  const data = {
    title: 'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
    keywords: [{ title: 'SRP' }, { title: 'OCP' }, { title: 'LSP' }, { title: 'ISP' }, { title: 'DIP' }],
  };

  return (
    <>
      <div className="flex flex-col w-[873px] gap-12 justify-center items-center">
        <div className="text-3xl font-extrabold">
          <span className="text-primary-600">{`${username}`}</span>
          <span>님 만을 위한 오늘의 맞춤 문제🎯</span>
        </div>
        <QuestionCard title={data.title} keywords={data.keywords} hint={hint} onHintClick={onHintClick} />
        <div className="flex flex-col justify-start w-full gap-2">
          <span className="text-xl font-semibold">나의 답변</span>
          <InputForm
            id="todayQuestion"
            placeholder="질문에 대한 답을 남겨주세요."
            value={value}
            limit={500}
            onChange={onChange}
            onSubmit={onSubmit}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </>
  );
};

export default TodayPage;
