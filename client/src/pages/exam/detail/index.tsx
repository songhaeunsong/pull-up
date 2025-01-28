import ExamProblem from '@/components/exam/problem';
import InfoSection from '@/components/exam/infoSection';
import SubmitButton from '@/components/common/submitButton';
import ProblemStatusButton from '@/components/exam/infoSection/problemStatusButton';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExamDetails } from '@/api/exam';
import { useExamStore } from '@/stores/examStore';

const ExamDetailPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  const { data: examProblems } = useGetExamDetails(Number(examId));
  //const [data, setData] = useState<ExamDetailsResponse>([]);
  const { answers, setSolutionPage, initializeFromDetail } = useExamStore();

  useEffect(() => {
    setSolutionPage(false);
    if (examProblems) {
      initializeFromDetail(examProblems);
    }
  }, [examProblems, initializeFromDetail, setSolutionPage]);

  if (!examProblems) {
    return <div>시험 데이터를 불러오는 데 실패했습니다.</div>;
  }

  console.log(answers);

  const onSubmit = async () => {
    try {
      // // ExamResultRequest 형식으로 변환
      // const requestBody: ExamResultRequest = {
      //   problemAndChosenAnswers: Object.keys(answers).map((problemId) => ({
      //     problemId: Number(problemId),
      //     chosenAnswer: answers[Number(problemId)],
      //   })),
      // };

      // // API 호출
      // await postExamAnswer(Number(examId), requestBody);

      // 결과 페이지로 이동
      navigate(`/exam/${examId}/result`);
    } catch (error) {
      console.error('답안 제출 실패:', error);
    }
  };

  return (
    <div className="mt-16 flex h-full w-full gap-20 bg-Main px-16 py-10">
      {/* 문제 리스트 */}
      <div className="flex w-[920px] flex-1 flex-col gap-10">
        {examProblems.map((problem) => (
          <ExamProblem
            key={problem.problemId}
            problem={{
              problemId: problem.problemId,
              question: problem.problem,
              subject: problem.subject,
              questionType: problem.problemType,
              options: problem.options,
            }}
          />
        ))}
      </div>

      {/* Info Section */}
      <div className="relative w-[380px] min-w-[380px] flex-shrink-0">
        <div className="sticky top-10 flex flex-col gap-10">
          <InfoSection title="남은 시간" icon="time">
            <span>00: 24: 32</span>
          </InfoSection>
          <InfoSection title="풀이 현황" icon="problem">
            <div className="grid grid-cols-5 gap-3">
              {examProblems.map((problem) => (
                <ProblemStatusButton
                  key={problem.problemId}
                  text={problem.problemId.toString()}
                  status={answers[problem.problemId] ? 'solved' : 'default'}
                  onClick={() => {
                    document.getElementById(`problem-${problem.problemId}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </InfoSection>
          <SubmitButton text="제출하기" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ExamDetailPage;
