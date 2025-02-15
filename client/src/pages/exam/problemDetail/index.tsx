//import ExamProblem from '@/components/exam/problem';
//import ExamSolution from '@/components/exam/solution';
import { useNavigate, useParams } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
import { lazy, Suspense, useEffect } from 'react';
import { useExamStore } from '@/stores/examStore';
import { useGetProblemDetail } from '@/api/problem';
import ExamProblemSkeleton from '@/components/exam/problem/ExamProblemSekleton';
import ExamSolutionSkeleton from '@/components/exam/solution/ExamSolutionSkeleton';

const ExamProblem = lazy(() => import('@/components/exam/problem'));
const ExamSolution = lazy(() => import('@/components/exam/solution'));

const ProblemDetail = () => {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const { data } = useGetProblemDetail(Number(problemId));
  const { setSolutionPage, setAnswer, initializeAndSetOptions } = useExamStore();

  useEffect(() => {
    setSolutionPage(true);
    if (data) {
      initializeAndSetOptions(Number(problemId), data.options);
      setAnswer(Number(problemId), data.answer);
    }
  }, [data, problemId, setSolutionPage, setAnswer, initializeAndSetOptions]);

  if (!data) {
    return <div>문제를 불러오는 데 실패했습니다.</div>;
  }

  const onHandleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-Main py-10">
      <div className="mt-24 flex w-[60%] min-w-[360px] flex-col gap-6 sm:mt-14 md:max-w-[900px]">
        <div className="flex w-full justify-start">
          <RouteHeader prev="목록으로" title="문제 상세보기" onBackClick={onHandleBack} />
        </div>

        <div className="flex flex-col gap-6">
          {/* 문제 섹션 */}
          <Suspense fallback={<ExamProblemSkeleton />}>
            <ExamProblem
              problem={{
                problemId: Number(problemId),
                question: data.question,
                subject: data.subject,
                questionType: 'MULTIPLE_CHOICE',
                options: data.options,
                answer: data.answer,
              }}
            />
          </Suspense>
          {/* 해설 섹션 */}
          <Suspense fallback={<ExamSolutionSkeleton />}>
            <ExamSolution answer={data.answer} correctRate={data.correctRate} explanation={data.explanation} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
