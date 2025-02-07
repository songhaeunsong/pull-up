import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postExamAnswer, useGetExamDetails } from '@/api/exam';
import { useExamStore } from '@/stores/examStore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Timer from '@/components/exam/timer';
import ExamProblem from '@/components/exam/problem';
import InfoSection from '@/components/exam/infoSection';
import ProblemStatusButton from '@/components/exam/infoSection/problemStatusButton';
import Icon from '@/components/common/icon';
import { cn } from '@/lib/utils';

const ExamDetailPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const { data: examProblems } = useGetExamDetails(Number(examId));
  const { answers, resetExamState, setAnswer, setSolutionPage, initializeAndSetOptions } = useExamStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!examProblems || isInitialized) return;
    resetExamState();
    setSolutionPage(false);
    examProblems.forEach((problem) => {
      initializeAndSetOptions(problem.problemId, problem.options);
      setAnswer(problem.problemId, '');
    });

    setIsInitialized(true);
  }, [examProblems, isInitialized, resetExamState, initializeAndSetOptions, setSolutionPage, setAnswer]);

  if (!examProblems) {
    return <div>시험 데이터를 불러오는 데 실패했습니다.</div>;
  }

  const isAllSolved = examProblems.every(
    (problem) => answers[problem.problemId] && answers[problem.problemId].trim() !== '',
  );

  const onSubmit = async () => {
    try {
      const requestBody = {
        problemAndChosenAnswers: Object.keys(answers).map((problemId) => ({
          problemId: Number(problemId),
          chosenAnswer: answers[Number(problemId)] ?? '',
        })),
      };
      await postExamAnswer(Number(examId), requestBody);

      navigate(`/exam/${examId}/result`);
    } catch (error) {
      console.error('답안 제출 실패:', error);
    }
  };

  const infoSections = [
    {
      id: 'timeLeft',
      title: '남은 시간',
      icon: 'time',
      content: <Timer initialTime={1500} onTimeOver={onSubmit} />,
    },
    {
      id: 'problemStatus',
      title: '문제 풀이 현황',
      icon: 'problem',
      content: (
        <div className="grid grid-cols-5 gap-2">
          {examProblems.map((problem, index) => (
            <ProblemStatusButton
              key={problem.problemId}
              index={index + 1}
              status={answers[problem.problemId] ? 'solved' : 'default'}
              onClick={() => {
                document
                  .getElementById(`problem-${problem.problemId}`)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex gap-12 bg-Main md:px-16 md:py-10">
      <div className="relative flex w-full flex-col gap-4 sm:mt-16 md:flex-row">
        {/* Info Section - Mobile View */}
        <section className="sticky top-2 border border-b-2 bg-white px-10 pb-2 pt-[86px] sm:pt-[8px] md:hidden">
          <Accordion type="single" defaultValue="timeLeft" collapsible>
            {infoSections.map(({ id, title, icon, content }) => (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Icon id={icon} size={20} className="h-auto md:w-6 lg:w-7" />
                    <span className="text-lg font-semibold text-stone-900 md:text-xl lg:text-2xl">{title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <InfoSection>{content}</InfoSection>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* 문제 리스트 */}
        <section className="flex-2 flex w-full flex-col gap-6 px-10 md:w-[920px] md:gap-10">
          {examProblems.map((problem, index) => (
            <div key={problem.problemId} id={`problem-${problem.problemId}`}>
              <ExamProblem
                index={index + 1}
                problem={{
                  problemId: problem.problemId,
                  question: problem.problem,
                  subject: problem.subject,
                  questionType: problem.problemType,
                  options: problem.options,
                }}
              />
            </div>
          ))}
        </section>

        <aside className="relative min-w-[280px] flex-1 flex-shrink-0 px-10 py-4 md:p-0 lg:min-w-[340px] xl:max-w-[380px]">
          {/* Info Section - Web View */}
          <div className="sticky top-10 flex flex-col gap-10">
            <div className="hidden flex-col gap-10 md:flex">
              {infoSections.map(({ id, title, icon, content }) => (
                <InfoSection key={id} title={title} icon={icon}>
                  {content}
                </InfoSection>
              ))}
            </div>
            {/* 제출 버튼 */}
            <AlertDialog>
              <AlertDialogTrigger
                className={cn(
                  isAllSolved ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-200 text-gray-500',
                  'mb-4 w-full rounded-xl py-4 text-lg font-semibold xl:py-5 xl:text-xl',
                )}
                disabled={!isAllSolved}
              >
                제출하기
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말 시험을 제출하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription>제출 후에는 더 이상 답안을 수정할 수 없습니다.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소하기</AlertDialogCancel>
                  <AlertDialogAction onClick={onSubmit}>제출하기</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ExamDetailPage;
