import { lazy, Suspense, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from '@/utils/debounce';
import RouteHeader from '@/components/common/routeheader';
import { useGetWrongProblemAll, useGetWrongProblemsByTitle } from '@/api/problem';
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

  const { data: searchResults } = useGetWrongProblemsByTitle(searchValue);
  const searchList =
    searchResults?.wrongProblemDtos.map((item) => ({
      id: item.problemId,
      title: item.question,
      date: convertDate(item.date),
      tags: convertSubject(item.subject),
    })) || [];

  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchValue(value), 300),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const displayedData = searchValue.trim().length > 0 ? searchList : wrongProblemDtos;

  const onHandleBack = () => {
    navigate('/dashboard');
  };

  return (
    <section className="flex h-full w-full flex-col gap-3">
      <RouteHeader prev="마이페이지" title="내가 틀린 문제" onBackClick={onHandleBack} />
      <Suspense fallback={<ReviewListSkeleton />}>
        <div className="flex flex-1 flex-col gap-4 rounded-xl bg-white p-4 md:gap-8 md:p-8">
          <SearchBar value={searchValue} onChange={handleSearchChange} />
          <ReviewList data={displayedData || []} />
        </div>
      </Suspense>
    </section>
  );
};

export default Wrong;
