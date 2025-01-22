import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
import ReviewList from '@/components/dashboard/reviewList';

const dummyData = [
  {
    id: 1,
    title: 'HTTP와 HTTPS의 차이는?',
    date: '2025-1-22',
    tags: '알고리즘',
  },
  {
    id: 2,
    title: 'HTTP와 HTTPS의 차이는?',
    date: '2025-01-01',
    tags: '자료구조',
  },
  {
    id: 3,
    title: 'HTTP와 HTTPS의 차이는?',
    date: '2024-11-01',
    tags: '알고리즘',
  },
];

const Archive = () => {
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

export default Archive;
