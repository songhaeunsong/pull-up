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
    content: '제3회 모의고사',
    date: '2025.01.12',
    subjects: ['운영체제', '네트워크', '운영체제'],
  };

  const dummyWrong = {
    content: '스택의 주요 특징은 무엇입니까?',
    subjects: ['자료구조'],
  };

  const dummyArchive = {
    content: '스택의 주요 특징은 무엇입니까?',
    subjects: ['자료구조'],
  };

  return (
    <div className="flex flex-row gap-3 rounded-2xl bg-white p-5 shadow-sm sm:w-full sm:gap-6 lg:w-[351px] lg:flex-col">
      <Profile image={image} name={name} email={email} subjects={subjects} onClick={onClick} />
      <hr className="hidden border-2 border-stone-200 lg:block" />
      <div className="flex w-full flex-row gap-4 lg:flex-col">
        <Card link="/dashboard/recent" title="최근에 푼 모의고사" data={dummyRecent} />
        <Card link="/dashboard/wrong" title="내가 틀린 문제" data={dummyWrong} />
        <Card link="/dashboard/archive" title="아카이브" data={dummyArchive} />
      </div>
    </div>
  );
};

export default SideBar;
