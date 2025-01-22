import SmallChip from '@/components/common/smallchip';
import SubmitButton from '@/components/common/submitButton';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/signin');
  };

  return (
    <div className="relative h-full w-full bg-primary-500">
      <div className="absolute left-0 top-0 h-full w-3/4 bg-white" />

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
        <img src="/assets/images/home.png" alt="대문 이미지" className="h-auto w-[500px]" />
      </div>
    </div>
  );
};

export default HomePage;
