import { Subject } from '@/types/member';
import Card from './card';
import Profile from './profile';

interface SideBarProps {
  image: string;
  name: string;
  email: string;
  subjects: Subject[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SideBar = ({ image, name, email, subjects, onClick }: SideBarProps) => {
  // 더미데이터
  const dummyRecent = {
    content: '제11회 모의고사',
    date: '2025.01.12',
    subjects: ['운영체제', '네트워크', 'OS'],
  };

  const dummyWrong = {
    content: 'TCP와 UDP의 차이점에 대해 설명하시오.',
    subjects: ['네트워크'],
  };

  const dummyArchive = {
    content: '다음 중 이진 탐색(Binary Search)에 대한 설명으로 올바른 것은 무엇입니까?',
    subjects: ['알고리즘'],
  };

  return (
    <div className="flex flex-row gap-3 rounded-2xl bg-white p-5 shadow-sm sm:w-full sm:gap-6 lg:w-[351px] lg:flex-col">
      <Profile image={image} name={name} email={email} subjects={subjects} onClick={onClick} />
      <hr className="hidden border-2 border-stone-200 lg:block" />
      <div className="flex flex-row gap-4 lg:flex-col">
        <Card link="/dashboard/recent" title="최근에 푼 모의고사" data={dummyRecent} />
        <Card link="/dashboard/wrong" title="내가 틀린 문제" data={dummyWrong} />
        <Card link="/dashboard/archive" title="아카이브" data={dummyArchive} />
      </div>
    </div>
  );
};

export default SideBar;
