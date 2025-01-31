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

    setIsInitialized(true); // 초기화 완료 표시
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
      // API 호출
      await postExamAnswer(Number(examId), requestBody);
      // 결과 페이지로 이동
      navigate(`/exam/${examId}/result`);
    } catch (error) {
      console.error('답안 제출 실패:', error);
    }
  };

  return (
    <div className="flex w-full gap-20 bg-Main px-16 pb-10 pt-28">
      {/* 문제 리스트 */}
      <div className="flex w-[920px] flex-1 flex-col gap-10">
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
      </div>

      {/* Info Section */}
      <div className="relative w-[380px] min-w-[380px] flex-shrink-0">
        <div className="sticky top-10 flex flex-col gap-10">
          <InfoSection title="남은 시간" icon="time">
            <span>
              <Timer initialTime={1500} onTimeOver={onSubmit} />
            </span>
          </InfoSection>
          <InfoSection title="풀이 현황" icon="problem">
            <div className="grid grid-cols-5 gap-3">
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
          <SubmitButton
            text="제출하기"
            onClick={onSubmit}
            disabled={!isAllSolved}
            color={!isAllSolved ? 'gray' : 'primary'}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamDetailPage;
