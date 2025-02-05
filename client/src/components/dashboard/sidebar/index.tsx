import Card from './card';
import Profile from './profile';

interface SideBarProps {
  image: string;
  name: string;
  email: string;
  subjects: string[];
}

const SideBar = ({ image, name, email, subjects }: SideBarProps) => {
  // 더미데이터
  const dummyRecent = {
    content: '제11회 모의고사',
    date: '2025.01.12',
    subjects: ['운영체제', '네트워크', 'OS'],
  };

  const dummyWrong = {
    content: 'React 컴포넌트에서 Props와 State의 차이는 무엇인가요?',
    subjects: ['운영체제', '네트워크', 'OS'],
  };

  const dummyArchive = {
    content: 'React 컴포넌트에서 Props와 State의 차이는 무엇인가요?',
    subjects: ['운영체제', '네트워크', 'OS'],
  };
  return (
    <div className="flex flex-row gap-3 rounded-2xl bg-white p-5 shadow-sm sm:w-full sm:gap-6 lg:w-[351px] lg:flex-col">
      <Profile image={image} name={name} email={email} subjects={subjects} />
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
