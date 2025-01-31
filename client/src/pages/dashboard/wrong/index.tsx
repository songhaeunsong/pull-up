import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
import ReviewList from '@/components/dashboard/reviewList';
import { useGetWrongQuestionAll } from '@/api/problem';

const Wrong = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { data: wrongQuestions } = useGetWrongQuestionAll();

  const wrongProblemDtos =
    wrongQuestions?.wrongProblemDtos.map((item) => ({
      id: item.problemId,
      title: item.question,
      date: item.date.split('T')[0],
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
      <RouteHeader prev="마이페이지" title="내가 틀린 문제" onBackClick={onHandleBack} />
      <ReviewList searchValue={searchValue} onSearchChange={handleSearchChange} data={wrongProblemDtos} />
    </section>
  );
};

export default Wrong;
