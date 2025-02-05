import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
import ReviewList from '@/components/dashboard/reviewList';
import { useGetExamAll } from '@/api/exam';
import convertDate from '@/utils/convertDate';

const Recent = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { data: examAll } = useGetExamAll();

  const examData =
    examAll?.content.map((exam) => ({
      id: exam.examId,
      title: exam.examName,
      date: convertDate(exam.date),
      tags: exam.subjects,
    })) || [];

  const onHandleBack = () => {
    navigate('/dashboard');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <section className="flex w-full flex-col gap-3">
      <RouteHeader prev="마이페이지" title="최근에 푼 모의고사" onBackClick={onHandleBack} />
      <ReviewList searchValue={searchValue} onSearchChange={handleSearchChange} data={examData} isProblem={false} />
    </section>
  );
};

export default Recent;
