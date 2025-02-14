import { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
//import ReviewList from '@/components/dashboard/reviewList';
import { useGetWrongProblemAll } from '@/api/problem';
import convertDate from '@/utils/convertDate';
import { convertSubject } from '@/utils/convertSubject';
import ReviewListSkeleton from '@/components/dashboard/reviewList/reviewListSkeleton';
import SearchBar from '@/components/common/searchbar';
const ReviewList = lazy(() => import('@/components/dashboard/reviewList'));

const Wrong = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { data: wrongProblems } = useGetWrongProblemAll();

  const wrongProblemDtos =
    wrongProblems?.wrongProblemDtos.map((item) => ({
      id: item.problemId,
      title: item.question,
      date: convertDate(item.date),
      tags: convertSubject(item.subject),
    })) || [];

  const onHandleBack = () => {
    navigate('/dashboard');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <section className="flex h-full w-full flex-col gap-3">
      <RouteHeader prev="마이페이지" title="내가 틀린 문제" onBackClick={onHandleBack} />
      <Suspense fallback={<ReviewListSkeleton />}>
        <div className="flex flex-1 flex-col gap-4 rounded-xl bg-white p-4 md:gap-8 md:p-8">
          <SearchBar value={searchValue} onChange={() => {}} />
          <ReviewList data={wrongProblemDtos} />
        </div>
      </Suspense>
    </section>
  );
};

export default Wrong;
