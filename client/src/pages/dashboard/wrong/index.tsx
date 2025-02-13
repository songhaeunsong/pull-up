import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
import ReviewList from '@/components/dashboard/reviewList';
import { useGetWrongProblemAll } from '@/api/problem';
import convertDate from '@/utils/convertDate';
import { convertSubject } from '@/utils/convertSubject';
import ReviewCardSkeleton from '@/components/dashboard/reviewCard/reviewCardSkeleton';

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
    <section className="flex w-full flex-col gap-3">
      <RouteHeader prev="마이페이지" title="내가 틀린 문제" onBackClick={onHandleBack} />
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <ReviewCardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <ReviewList searchValue={searchValue} onSearchChange={handleSearchChange} data={wrongProblemDtos} />
      </Suspense>
    </section>
  );
};

export default Wrong;
