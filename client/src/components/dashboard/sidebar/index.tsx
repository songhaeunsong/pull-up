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
    <div className="flex flex-col rounded-2xl gap-6 w-[351px] p-5 shadow-sm bg-white">
      <Profile image={image} name={name} email={email} subjects={subjects} />
      <hr className="border-b-2 border-stone-200" />
      <div className="flex flex-col gap-5">
        <Card link="/recent" title="최근에 푼 모의고사" data={dummyRecent} />
        <Card link="wrong" title="내가 틀린 문제" data={dummyWrong} />
        <Card link="archaive" title="아카이브" data={dummyArchive} />
      </div>
    </div>
  );
};

export default SideBar;
