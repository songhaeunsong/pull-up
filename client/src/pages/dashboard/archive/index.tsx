import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
import ReviewList from '@/components/dashboard/reviewList';
import { useGetArchivedProblemAll } from '@/api/problem';
import { convertSubject } from '@/utils/convertSubject';
import SearchBar from '@/components/common/searchbar';

const Archive = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { data: archivedProblems } = useGetArchivedProblemAll();

  const problems =
    archivedProblems?.bookmarkedProblemDtos.map((item) => ({
      id: item.problemId,
      title: item.question,
      date: item.date,
      tags: convertSubject(item.subject),
    })) || [];

  const onHandleBack = () => {
    navigate('/dashboard');
  };

  return (
    <section className="flex h-full w-full flex-col gap-3">
      <RouteHeader prev="마이페이지" title="아카이브" onBackClick={onHandleBack} />
      <div className="flex flex-1 flex-col rounded-xl bg-white p-4 md:p-8">
        <SearchBar value={searchValue} onChange={() => {}} />
        <ReviewList data={problems} />
      </div>
    </section>
  );
};

export default Archive;
