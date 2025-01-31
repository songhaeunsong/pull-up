import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
import ReviewList from '@/components/dashboard/reviewList';

const dummyData = [
  {
    id: 1,
    title: '제 11회 모의고사',
    date: '2025-01-22',
    tags: ['알고리즘', '자료구조'],
  },
  {
    id: 2,
    title: '제 10회 모의고사',
    date: '2025-01-01',
    tags: ['알고리즘', '자료구조'],
  },
  {
    id: 3,
    title: '제 9회 모의고사',
    date: '2024-11-01',
    tags: ['알고리즘', '운영체제'],
  },
];

const Recent = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const onHandleBack = () => {
    navigate('/dashboard');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <section className="flex w-full flex-col gap-3">
      <RouteHeader prev="마이페이지" title="아카이브" onBackClick={onHandleBack} />
      <ReviewList searchValue={searchValue} onSearchChange={handleSearchChange} data={dummyData} />
    </section>
  );
};

export default Recent;
