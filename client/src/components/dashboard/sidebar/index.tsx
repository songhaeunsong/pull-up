import { Subject } from '@/types/member';
import Card from './card';
import Profile from './profile';
import { convertSubject } from '@/utils/convertSubject';
import { useGetArchivedProblemAll, useGetRecentWrongProblem } from '@/api/problem';
import { useGetExamAll } from '@/api/exam';

interface SideBarProps {
  image: string;
  name: string;
  email: string;
  subjects: Subject[];
}

const SideBar = ({ image, name, email, subjects }: SideBarProps) => {
  const { data: recentWrongProblems } = useGetRecentWrongProblem();
  const { data: archivedProblems } = useGetArchivedProblemAll();
  const { data: examAll } = useGetExamAll();

  function getProcessedProblemList(
    problemDtos?: { question: string; subject: string }[],
    defaultMessage: string = '데이터가 없습니다!',
    limit: number = 10,
  ) {
    if (!problemDtos || problemDtos.length === 0) {
      return [{ content: defaultMessage, date: '', subjects: [] }];
    }
    return (
      problemDtos?.slice(0, Math.min(problemDtos.length, limit)).map((item) => ({
        content: item.question,
        subjects: Array.isArray(item.subject) ? item.subject : [convertSubject(item.subject)],
      })) ?? [{ content: defaultMessage, subjects: [] }]
    );
  }

  // 최근 모의고사
  const recentExamList = examAll?.getExamResponses?.slice(0, 1).map((item) => ({
    content: item.examName,
    subjects: convertSubject(item.subjects),
  })) ?? [{ content: '데이터가 없습니다.', subjects: [] }];
  // 틀린 문제 리스트
  const wrongProblemList = getProcessedProblemList(recentWrongProblems?.recentWrongQuestionDtos);
  // 아카이브 문제 리스트
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
