import ExamProblem from '@/components/exam/problem';
import InfoSection from '@/components/exam/infoSection';
import SubmitButton from '@/components/common/submitButton';
import ProblemStatusButton from '@/components/exam/infoSection/problemStatusButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 더미 데이터
const examProblems: {
  id: number;
  content: string;
  subject: string;
  questionType: 'objective' | 'subjective';
  options: { content: string }[];
}[] = [
  {
    id: 1,
    content: 'HTTPS가 HTTP보다 안전한 이유는 무엇인가요?',
    subject: '네트워크',
    questionType: 'objective',
    options: [
      { content: '데이터 압축을 지원하기 때문' },
      { content: '대칭키 암호를 지원하기 때문' },
      { content: '데이터 압축을 지원하기 때문' },
      { content: '빠른 속도를 제공하기 때문' },
    ],
  },
  {
    id: 2,
    content: '다음 중 OSI 7계층에 해당하지 않는 것은 무엇인가요?',
    subject: '네트워크',
    questionType: 'objective',
    options: [
      { content: '물리 계층' },
      { content: '전송 계층' },
      { content: '데이터베이스 계층' },
      { content: '응용 계층' },
    ],
  },
  {
    id: 3,
    content: 'TCP와 UDP의 차이점을 설명하세요.',
    subject: '네트워크',
    questionType: 'subjective',
    options: [],
  },
  {
    id: 4,
    content: '다음 중 OSI 7계층에 해당하지 않는 것은 무엇인가요?',
    subject: '네트워크',
    questionType: 'objective',
    options: [
      { content: '물리 계층' },
      { content: '전송 계층' },
      { content: '데이터베이스 계층' },
      { content: '응용 계층' },
    ],
  },
];

const ExamSolvePage = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate('/exam/result');
  };

  const [answers, setAnswers] = useState<{ [key: number]: string | number }>({});

  const handleAnswerSelect = (problemId: number, answer: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [problemId]: answer,
    }));
  };

  console.log(answers);

  return (
    <div className="flex w-full gap-20 bg-Main px-16 py-10">
      <div className="flex w-[920px] flex-1 flex-col gap-10">
        {examProblems.map((problem) => (
          <ExamProblem
            key={problem.id}
            problem={problem}
            onSelectOption={(index) => handleAnswerSelect(problem.id, index + 1)}
            onTextAnswerChange={(answer) => handleAnswerSelect(problem.id, answer)}
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
                  key={problem.id}
                  text={problem.id.toString()}
                  status={answers[problem.id] ? 'solved' : 'default'}
                  onClick={() => {
                    document.getElementById(`problem-${problem.id}`)?.scrollIntoView({ behavior: 'smooth' });
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

export default ExamSolvePage;
