import ExamAnswer from './examAnswer';
import Icon from '@/components/common/icon';
import { useExamStore } from '@/stores/examStore';

interface ExamProblemProps {
  index: number;
  problem: {
    problemId: number;
    question: string;
    subject: string;
    questionType: 'SHORT_ANSWER' | 'MULTIPLE_CHOICE';
    chosenAnswer?: string;
    options?: string[];
    answer?: string;
  };
}

const ExamProblem = ({ index, problem }: ExamProblemProps) => {
  const { isSolutionPage, bookmark, toggleBookmark } = useExamStore();

  return (
    <div className="flex flex-col gap-7 rounded-xl border border-primary-200 bg-white px-7 py-7">
      {/* 질문 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer items-center gap-2">
            <span className="text-2xl font-bold text-stone-900">문제 {index}</span>
            {isSolutionPage && (
              <button
                onClick={() => toggleBookmark(problem.problemId)}
                aria-label={bookmark[problem.problemId] ? '북마크 해제' : '북마크 추가'}
              >
                <Icon id={bookmark[problem.problemId] ? 'bookmark' : 'bookmark-empty'} size={24} />
              </button>
            )}
          </div>
          <div className="rounded-lg border border-secondary-600 bg-secondary-50 px-3 py-1 text-secondary-600">
            {problem.subject}
          </div>
        </div>
        <span className="text-2xl font-semibold">{problem.question}</span>
      </div>
      {/* 답안 선택 섹션 */}
      <ExamAnswer questionType={problem.questionType} problemId={problem.problemId} />
    </div>
  );
};

export default ExamProblem;
