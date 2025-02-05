import SwipeCard from '@/components/common/swipeCard';
import MobileProfile from './profile/MobileProfile';
import Card from './card';

interface MobileTopBarProps {
  image: string;
  name: string;
  email: string;
  subjects: string[];
}

const MobileTopBar = ({ image, name, email, subjects }: MobileTopBarProps) => {
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

  const examComponents = [
    { id: 'recent', component: <Card link="/dashboard/recent" title="최근에 푼 모의고사" data={dummyRecent} /> },
    { id: 'wrong', component: <Card link="/dashboard/wrong" title="내가 틀린 문제" data={dummyWrong} /> },
    { id: 'archive', component: <Card link="/dashboard/archive" title="아카이브" data={dummyArchive} /> },
  ];

  return (
    <>
      <MobileProfile image={image} name={name} email={email} subjects={subjects} />
      <SwipeCard components={examComponents} dots={true} />
    </>
  );
};

export default MobileTopBar;
