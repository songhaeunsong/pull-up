import InfoSection from '@/components/exam/infoSection';
import SubmitButton from '@/components/common/submitButton';
import ProblemStatusButton from '@/components/exam/infoSection/problemStatusButton';
import ExamSolution from '@/components/exam/solution';
import ExamProblem from '@/components/exam/problem';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExamResult } from '@/api/exam';
import { ExamResultResponse } from '@/types/exam';
import { useEffect, useState } from 'react';
import { useExamStore } from '@/stores/examStore';

const ExamResultPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const { setSolutionPage, initializeFromResults } = useExamStore();
  const { data: examResult } = useGetExamResult(Number(examId));
  const [data, setData] = useState<ExamResultResponse>();

  useEffect(() => {
    setSolutionPage(true); // 결과 페이지로 설정
    if (examResult) {
      initializeFromResults(examResult.examResultDetailDtos);
      // Zustand 상태를 콘솔에 출력
      console.log('Zustand State after initialization:', {
        answers: useExamStore.getState().answers,
        options: useExamStore.getState().options,
        bookmark: useExamStore.getState().bookmark,
      });
    }
  }, [examResult, initializeFromResults, setSolutionPage]);

  if (!examResult) {
    return <div>시험 결과를 불러오는 데 실패했습니다.</div>;
  }

  console.log(examResult.examResultDetailDtos);

  const { round, score, examResultDetailDtos } = examResult;

  return (
    <div className="flex w-full gap-20 bg-Main px-16 py-10">
      {/* Problem & Solution Section */}
      <div className="flex w-[920px] flex-1 flex-col gap-10">
        {examResultDetailDtos.map((problem, index) => (
          <div key={problem.problemId} className="flex flex-col gap-2">
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
            <ExamSolution answer={problem.answer} correctRate={problem.correctRate} explanation={problem.explanation} />
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="relative w-[380px] min-w-[380px] flex-shrink-0">
        <div className="sticky top-10 flex flex-col gap-10">
          <InfoSection>
            <span className="text-3xl">{round}</span>
          </InfoSection>
          <InfoSection title="점수" icon="score">
            <div>
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
                    document.getElementById(`problem-${problem.problemId}`)?.scrollIntoView({ behavior: 'smooth' }); // 문제로 이동
                  }}
                />
              ))}
            </div>
          </InfoSection>
          <SubmitButton
            text="확인 완료"
            onClick={() => {
              navigate(`/dashboard`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamResultPage;
