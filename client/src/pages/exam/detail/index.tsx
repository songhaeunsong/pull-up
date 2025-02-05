import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postExamAnswer, useGetExamDetails } from '@/api/exam';
import { useExamStore } from '@/stores/examStore';
import Timer from '@/components/exam/timer';
import ExamProblem from '@/components/exam/problem';
import InfoSection from '@/components/exam/infoSection';
import SubmitButton from '@/components/common/submitButton';
import ProblemStatusButton from '@/components/exam/infoSection/problemStatusButton';

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
      // ExamResultRequest 형식으로 변환
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

  return (
    <div className="flex gap-12 bg-Main p-10 px-16">
      <div className="mt-[94px] flex w-full flex-col gap-16 sm:mt-16 md:flex-row lg:gap-20">
        {/* 문제 리스트 */}
        <section className="flex-2 flex w-full flex-col gap-10 md:w-[920px]">
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
        {/* Info Section - Mobile View (공통 컴포넌트 사용 예정) */}
        {/* Info Section  - Web View */}
        <aside className="relative min-w-[280px] flex-1 flex-shrink-0 lg:min-w-[340px] xl:max-w-[380px]">
          <div className="sticky top-10 flex flex-col gap-10">
            <div className="hidden flex-col gap-10 md:flex">
              <InfoSection title="남은 시간" icon="time">
                <span>
                  <Timer initialTime={1500} onTimeOver={onSubmit} />
                </span>
              </InfoSection>
              <InfoSection title="풀이 현황" icon="problem">
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
              </InfoSection>
            </div>
            <SubmitButton
              text="제출하기"
              onClick={onSubmit}
              disabled={!isAllSolved}
              color={!isAllSolved ? 'gray' : 'primary'}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ExamDetailPage;
