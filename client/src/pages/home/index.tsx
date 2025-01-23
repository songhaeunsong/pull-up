import SmallChip from '@/components/common/smallchip';
import SubmitButton from '@/components/common/submitButton';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/signin');
  };

  return (
    <div
      className="relative h-full w-full"
      style={{
        background: `
        radial-gradient(circle at 50% 50%, rgb(255, 255, 255) 0%, transparent 100%),
        radial-gradient(circle at 50% 10%, rgb(186, 230, 253) 0%, transparent 30%),
        radial-gradient(circle at 80% 80%, rgb(227, 227, 255) 0%, transparent 50%),
        linear-gradient(180deg, rgb(219, 234, 254) 0%, rgb(255, 255, 255) 100%)
      `,
      }}
    >
      <div className="relative flex h-full w-full items-center justify-center gap-[20rem]">
        {/* 좌측 컨테이너 */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <SmallChip title="오늘의 질문" color="border-2 border-primary-500 bg-primary-50 text-primary-500" />
              <SmallChip title="모의고사" color="border-2 border-primary-500 bg-primary-500 text-white" />
              <SmallChip title="학습 게임" color="border-2 border-primary-500 bg-primary-50 text-primary-500" />
            </div>
            <div className="flex flex-col text-5xl font-semibold">
              <span>나의 기술 스택과 실력</span>
              <span>맞춤으로 준비하는 면접</span>
            </div>
            <div className="flex flex-col text-2xl font-medium">
              <span>CS 모의고사 풀이부터</span>
              <span>매일 알림으로 받는 기술 면접까지</span>
            </div>
            <span className="text-xl font-medium text-primary-500">간편하게 오늘의 문제부터 받아보세요.</span>
          </div>
          <SubmitButton text="알림 받으러 가기" color="secondary" onClick={onClick} />
        </div>
        {/* 우측 컨테이너 */}
        <img src="/assets/images/exam1.png" alt="대문 이미지" className="h-auto w-[600px]" />
      </div>
    </div>
  );
};

export default HomePage;
