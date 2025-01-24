import ExamProblem from '@/components/exam/problem';
import InfoSection from '@/components/exam/infoSection';
import SubmitButton from '@/components/common/submitButton';
import ProblemStatusButton from '@/components/exam/infoSection/problemStatusButton';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExamDetails } from '@/api/exam';
import { ExamDetailsResponse } from '@/types/exam';

const ExamDetailPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  // React Query를 사용해 모의고사 문제 가져오기
  const { data: examProblems } = useGetExamDetails(Number(examId));
  const [data, setData] = useState<ExamDetailsResponse>([
    {
      problemId: 1,
      problem: 'http는 무엇일까요?',
      options: ['데이터 압축 지원', 'https에서 s 뺀 것', '안녕', '하세요'],
      subject: '네트워크',
      problemType: 'MULTIPLE_CHOICE',
    },
  ]);
  // 정답 상태 관리
  const [answers, setAnswers] = useState<{ [key: number]: string | number }>({});

  useEffect(() => {
    if (examProblems) {
      setData(examProblems);
    }
  }, [examProblems]);

  if (!examProblems) {
    return <div>시험 데이터를 불러오는 데 실패했습니다.</div>;
  }

  const handleAnswerSelect = (problemId: number, answer: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [problemId]: answer,
    }));
  };

  const onSubmit = () => {
    navigate(`/exam/${examId}/result`);
  };

  return (
    <div className="mt-16 flex h-full w-full gap-20 bg-Main px-16 py-10">
      {/* 문제 리스트 */}
      <div className="flex w-[920px] flex-1 flex-col gap-10">
        {data.map((problem) => (
          <ExamProblem
            key={problem.problemId}
            problem={{
              problemId: problem.problemId,
              content: problem.problem,
              subject: problem.subject,
              questionType: problem.problemType,
              options: problem.options?.map((option) => ({ content: option, state: 'default' })),
            }}
            onSelectOption={(index) => handleAnswerSelect(problem.problemId, index + 1)}
            onTextAnswerChange={(answer) => handleAnswerSelect(problem.problemId, answer)}
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
