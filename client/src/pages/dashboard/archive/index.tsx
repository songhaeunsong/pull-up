import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
import ReviewList from '@/components/dashboard/reviewList';
import { useGetArchivedProblemAll, useGetArchivedProblemsByTitle } from '@/api/problem';
import { convertSubject } from '@/utils/convertSubject';
import SearchBar from '@/components/common/searchbar';
import { debounce } from 'lodash';
import convertDate from '@/utils/convertDate';
import { InputChangeEvent } from '@/types/event';

const Archive = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  // 전체 데이터 가져오기
  const { data: archivedProblems } = useGetArchivedProblemAll();
  const bookmarkedProblemDtos =
    archivedProblems?.bookmarkedProblemDtos.map((item) => ({
      id: item.problemId,
      title: item.question,
      date: item.date,
      tags: convertSubject(item.subject),
    })) || [];

  // 검색 결과 데이터 가져오기
  const { data: searchResults } = useGetArchivedProblemsByTitle(debouncedSearchValue);
  const searchList =
    searchResults?.bookmarkedProblemDtos.map((item) => ({
      id: item.problemId,
      title: item.question,
      date: convertDate(item.date),
      tags: convertSubject(item.subject),
    })) || [];

  // debounce된 검색어 업데이트
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchValue(inputValue.trim());
    }, 300);
    handler();
    return () => {
      handler.cancel();
    };
  }, [inputValue]);

  // 검색어 유무에 따라 표시할 데이터 결정
  const displayedData = debouncedSearchValue ? searchList : bookmarkedProblemDtos;

  const onHandleBack = () => {
    navigate('/dashboard');
  };

  const onChange = (e: InputChangeEvent) => {
    setInputValue(e.target.value);
  };

  return (
    <section className="flex h-full w-full flex-col gap-3">
      <RouteHeader prev="마이페이지" title="아카이브" onBackClick={onHandleBack} />
      <div className="flex flex-1 flex-col gap-4 rounded-xl bg-white p-4 md:gap-8 md:p-8">
        <SearchBar value={inputValue} onChange={onChange} />
        <ReviewList data={displayedData} />
      </div>
    </section>
  );
};

export default Archive;
