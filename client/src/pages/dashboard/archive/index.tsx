import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
import ReviewList from '@/components/dashboard/reviewList';
import { useGetArchivedProblemAll } from '@/api/problem';

const Archive = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { data: archivedProblems } = useGetArchivedProblemAll();

  const problems =
    archivedProblems?.bookmarkedProblemDtos.map((item) => ({
      id: item.problemId,
      title: item.question,
      date: item.date,
      tags: item.subject,
    })) || [];

  const onHandleBack = () => {
    navigate('/dashboard');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <section className="flex w-full flex-col gap-3">
      <RouteHeader prev="마이페이지" title="아카이브" onBackClick={onHandleBack} />
      <ReviewList searchValue={searchValue} onSearchChange={handleSearchChange} data={problems} />
    </section>
  );
};

export default Archive;
