import ExamProblem from '@/components/exam/problem';
import ExamSolution from '@/components/exam/solution';
import { useNavigate, useParams } from 'react-router-dom';
import RouteHeader from '@/components/common/routeheader';
import { useEffect } from 'react';
import { useExamStore } from '@/stores/examStore';
import { useGetProblemDetail } from '@/api/problem';

const ProblemDetail = () => {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const { data } = useGetProblemDetail(Number(problemId));
  //console.log(data);
  const { setSolutionPage, setAnswer, initializeAndSetOptions } = useExamStore();

  useEffect(() => {
    setSolutionPage(true);
    if (data) {
      initializeAndSetOptions(Number(problemId), data.options);
      setAnswer(Number(problemId), data.answer);
      // console.log('options:', useExamStore.getState().options);
    }
  }, [data, problemId, setSolutionPage, setAnswer, initializeAndSetOptions]);

  if (!data) {
    return <div>문제를 불러오는 데 실패했습니다.</div>;
  }

  const onHandleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center bg-Main py-24">
      <div className="flex w-[900px] flex-col gap-6">
        <div className="flex w-full justify-start">
          <RouteHeader prev="목록으로" title="문제 상세보기" onBackClick={onHandleBack} />
        </div>
        <div className="flex flex-col gap-6">
          <ExamProblem
            index={1}
            problem={{
              problemId: Number(problemId),
              question: data.question,
              subject: data.subject,
              questionType: 'MULTIPLE_CHOICE',
              options: data.options,
              answer: data.answer,
            }}
          />
          <ExamSolution answer={data.answer} correctRate={data.correctRate} explanation={data.explanation} />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
