import { Subject } from '@/types/member';
import Card from './card';
import Profile from './profile';
import { convertSubject } from '@/utils/convertSubject';
import { useGetArchivedProblemAll, useGetWrongProblemAll } from '@/api/problem';
import { useGetExamAll } from '@/api/exam';
import convertDate from '@/utils/convertDate';

interface SideBarProps {
  image: string;
  name: string;
  email: string;
  subjects: Subject[];
}

const SideBar = ({ image, name, email, subjects }: SideBarProps) => {
  const { data: wrongProblems, isError } = useGetWrongProblemAll();
  const { data: archivedProblems } = useGetArchivedProblemAll();
  const { data: examAll } = useGetExamAll();

  // 헬퍼 함수: 문제 리스트 가공
  function getProcessedProblemList(
    problemDtos?: { question: string; subject: string }[],
    defaultMessage: string = '데이터가 없습니다.',
    limit: number = 10,
  ) {
    return (
      problemDtos?.slice(0, Math.min(problemDtos.length, limit)).map((item) => ({
        content: item.question,
        subjects: Array.isArray(item.subject) ? item.subject : [convertSubject(item.subject)],
      })) ?? [{ content: defaultMessage, subjects: [] }]
    );
  }

  // 부모 컴포넌트에서 데이터 가공
  const recentExamList = examAll?.getExamResponses?.slice(0, 1).map((item) => ({
    content: item.examName,
    subjects: convertSubject(item.subjects),
    date: convertDate(item.date),
  })) ?? [{ content: '데이터가 없습니다.', subjects: [] }];
  const wrongProblemList = getProcessedProblemList(wrongProblems?.wrongProblemDtos);
  const archiveProblemList = getProcessedProblemList(archivedProblems?.bookmarkedProblemDtos);

  return (
    <div className="flex flex-row gap-3 rounded-2xl bg-white p-5 shadow-sm sm:w-full sm:gap-6 lg:w-[351px] lg:flex-col">
      <Profile image={image} name={name} email={email} subjects={convertSubject(subjects)} />
      <hr className="hidden border-2 border-stone-200 lg:block" />
      <div className="flex w-full flex-row gap-4 lg:flex-col">
        <Card link="/dashboard/recent" title="최근에 푼 모의고사" data={recentExamList[0]} />
        <Card link="/dashboard/wrong" title="내가 틀린 문제" data={wrongProblemList[0]} />
        <Card link="/dashboard/archive" title="아카이브" data={archiveProblemList[0]} />
      </div>
    </div>
  );
};

export default SideBar;
