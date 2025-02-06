import InfoSection from '@/components/exam/infoSection';
import SubmitButton from '@/components/common/submitButton';
import ProblemStatusButton from '@/components/exam/infoSection/problemStatusButton';
import ExamSolution from '@/components/exam/solution';
import ExamProblem from '@/components/exam/problem';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExamResult } from '@/api/exam';
import { useEffect } from 'react';
import { useExamStore } from '@/stores/examStore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/common/icon';

const ExamResultPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const { setSolutionPage, initializeAndSetOptions, setAnswer, toggleBookmark } = useExamStore();
  const { data: examResult } = useGetExamResult(Number(examId));
  // const [data, setData] = useState<ExamResultResponse>();

  useEffect(() => {
    setSolutionPage(true); // 결과 페이지로 설정
    if (examResult) {
      // 각 문제에 대해 상태 초기화
      examResult.examResultDetailDtos.forEach((problem) => {
        initializeAndSetOptions(problem.problemId, problem.options, {
          answer: problem.answer,
          chosenAnswer: problem.chosenAnswer,
        });
        // 선택한 답변 저장
        if (problem.chosenAnswer) {
          setAnswer(problem.problemId, problem.chosenAnswer);
        }

        // 북마크 상태 설정
        if (problem.bookmarkStatus) {
          toggleBookmark(problem.problemId);
        }
      });
    }
  }, [examResult, initializeAndSetOptions, setAnswer, toggleBookmark, setSolutionPage]);

  if (!examResult) {
    return <div>시험 결과를 불러오는 데 실패했습니다.</div>;
  }

  console.log(examResult.examResultDetailDtos);

  const { round, score, examResultDetailDtos } = examResult;

  return (
    <div className="flex gap-12 bg-Main md:px-16 md:py-10">
      <div className="relative flex w-full flex-col gap-4 sm:mt-16 md:flex-row">
        {/* Info Section*/}
        <div className="sticky top-2 border border-b-2 bg-white px-10 pb-2 pt-[82px] md:hidden">
          <section className="rounded-xl px-7 py-4">
            <Accordion type="single" defaultValue="score" collapsible className="">
              <AccordionItem value="score">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Icon id={'score'} size={20} className="h-auto md:w-6 lg:w-7" />
                    <span className="text-lg font-semibold text-stone-900 md:text-xl lg:text-2xl">점수</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <InfoSection>
                    <div className="text-xl md:text-2xl lg:text-3xl">
                      <span className="text-primary-500">{score}</span> / 100
                    </div>
                  </InfoSection>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="problemStatus">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Icon id={'problem'} size={20} className="h-auto md:w-6 lg:w-7" />
                    <span className="text-lg font-semibold text-stone-900 md:text-xl lg:text-2xl">문제 풀이 현황</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <InfoSection>
                    <div className="grid grid-cols-5 gap-3">
                      {examResultDetailDtos.map((problem, index) => (
                        <ProblemStatusButton
                          index={index + 1}
                          key={problem.problemId}
                          status={problem.answerStatus ? 'correct' : 'wrong'} // 문제의 정답 여부를 기반으로 상태 설정
                          onClick={() => {
                            document
                              .getElementById(`problem-${problem.problemId}`)
                              ?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 문제로 이동
                          }}
                        />
                      ))}
                    </div>
                  </InfoSection>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
        {/* Problem & Solution Section */}
        <section className="flex-2 flex w-full flex-col gap-6 px-10 md:w-[920px] md:gap-10">
          {examResultDetailDtos.map((problem, index) => (
            <div key={problem.problemId} id={`problem-${problem.problemId}`} className="flex flex-col gap-2">
              <ExamProblem
                index={index + 1}
                problem={{
                  problemId: problem.problemId,
                  question: problem.problem,
                  subject: problem.subject,
                  questionType: problem.problemType,
                  options: problem.options,
                  chosenAnswer: problem.chosenAnswer,
                }}
              />
              <ExamSolution
                answer={problem.answer}
                correctRate={problem.correctRate}
                explanation={problem.explanation}
              />
            </div>
          ))}
        </section>
        {/* Info Section - Web View */}
        <aside className="relative min-w-[280px] flex-1 flex-shrink-0 px-10 py-4 md:p-0 lg:min-w-[340px] xl:max-w-[380px]">
          <div className="sticky top-10 flex flex-col gap-10">
            <div className="hidden flex-col gap-10 md:flex">
              <InfoSection>
                <span className="text-xl md:text-2xl lg:text-3xl">{round}</span>
              </InfoSection>
              <InfoSection title="점수" icon="score">
                <div className="text-xl md:text-2xl lg:text-3xl">
                  <span className="text-primary-500">{score}</span> / 100
                </div>
              </InfoSection>
              <InfoSection title="풀이 현황" icon="problem">
                <div className="grid grid-cols-5 gap-3">
                  {examResultDetailDtos.map((problem, index) => (
                    <ProblemStatusButton
                      index={index + 1}
                      key={problem.problemId}
                      status={problem.answerStatus ? 'correct' : 'wrong'} // 문제의 정답 여부를 기반으로 상태 설정
                      onClick={() => {
                        document
                          .getElementById(`problem-${problem.problemId}`)
                          ?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 문제로 이동
                      }}
                    />
                  ))}
                </div>
              </InfoSection>
            </div>
            <SubmitButton
              text="확인 완료"
              onClick={() => {
                navigate(`/dashboard`);
              }}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ExamResultPage;
