import InfoSection from '@/components/exam/infoSection';
import SubmitButton from '@/components/common/submitButton';
import ProblemStatusButton from '@/components/exam/infoSection/problemStatusButton';
import ExamSolution from '@/components/exam/solution';
import ExamProblem from '@/components/exam/problem';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExamResult } from '@/api/exam';
import { useEffect } from 'react';
import { useExamStore } from '@/stores/examStore';

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
    <div className="flex gap-12 bg-Main px-16 py-10">
      <div className="mt-[94px] flex w-full flex-col sm:mt-16 sm:gap-16 md:flex-row lg:gap-20">
        {/* Problem & Solution Section */}
        <section className="flex-2 flex w-full min-w-[360px] flex-col gap-10 md:w-[920px]">
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
        {/* Info Section - Mobile View (공통 컴포넌트 사용 예정) */}
        {/* Info Section - Web View */}
        <aside className="relative min-w-[280px] flex-1 flex-shrink-0 lg:min-w-[340px] xl:max-w-[380px]">
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
