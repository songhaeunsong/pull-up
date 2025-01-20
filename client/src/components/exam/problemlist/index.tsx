import { useState } from 'react';
import ExamProblem from '../problem';

const examProblems = [
  {
    id: 1,
    content: 'HTTPS가 HTTP보다 안전한 이유는 무엇인가요?',
    subject: '네트워크',
    isBookmarked: false,
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
    isBookmarked: true,
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
    isBookmarked: false,
    questionType: 'subjective',
    options: [],
  },
];

const ExamProblemList = () => {
  const [problems, setProblems] = useState(examProblems);

  const handleSelect = (problemId: number, optionIndex: number) => {
    setProblems((prev) =>
      prev.map((problem) =>
        problem.id === problemId
          ? {
              ...problem,
              options: problem.options.map((option, i) =>
                i === optionIndex ? { ...option, state: 'selected' } : { ...option, state: 'default' },
              ),
            }
          : problem,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {problems.map((problem) => (
        <ExamProblem key={problem.id} problem={problem} onSelectOption={(index) => handleSelect(problem.id, index)} />
      ))}
    </div>
  );
};

export default ExamProblemList;
