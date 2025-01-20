import ExamAnswer from './examAnswer';
import Icon from '@/components/common/icon';

interface ExamProblemProps {
  problem: {
    id: number;
    content: string;
    subject: string;
    isBookmarked: boolean;
    questionType: 'objective' | 'subjective';
    options: { content: string; state: 'default' | 'selected' | 'wrong' | 'correct' | null }[];
  };
  onSelectOption: (index: number) => void;
}

const ExamProblem = ({ problem, onSelectOption }: ExamProblemProps) => {
  return (
    <div className="flex min-w-[900px] flex-col gap-7 rounded-xl border border-primary-200 bg-white px-10 py-7">
      {/* 질문 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer items-center gap-2">
            <span className="text-2xl font-bold">문제 {problem.id}</span>
            <Icon id={problem.isBookmarked ? 'bookmark' : 'bookmark-empty'} size={24} />
          </div>
          <div className="rounded-lg border border-secondary-600 bg-secondary-50 px-3 py-1 text-secondary-600">
            {problem.subject}
          </div>
        </div>
        <span className="text-3xl font-semibold">{problem.content}</span>
      </div>
      {/* 답안 선택 섹션 */}
      <ExamAnswer questionType={problem.questionType} options={problem.options} onSelectOption={onSelectOption} />
    </div>
  );
};

export default ExamProblem;
