import ExamAnswer from './examAnswer';
import Icon from '@/components/common/icon';
import { useExamStore } from '@/stores/ExamStore';

interface ExamProblemProps {
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

const ExamProblem = ({ problem }: ExamProblemProps) => {
  const { answers, setAnswer, updateOptionState, isSolutionPage, bookmarks, toggleBookmark } = useExamStore();
  const handleOptionClick = (index: number) => {
    setAnswer(problem.problemId, problem.options![index]);
    updateOptionState(problem.problemId, index, 'selected');
  };

  const handleTextChange = (text: string) => {
    setAnswer(problem.problemId, text);
  };

  const handleBookmarkClick = () => {
    toggleBookmark(problem.problemId);
  };

  return (
    <div className="flex flex-col gap-7 rounded-xl border border-primary-200 bg-white px-7 py-7">
      {/* 질문 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer items-center gap-2">
            <span className="text-2xl font-bold text-stone-900">문제 {problem.problemId}</span>
            {isSolutionPage && (
              <div className="cursor-pointer" onClick={handleBookmarkClick}>
                <Icon id={bookmarks[problem.problemId] ? 'bookmark' : 'bookmark-empty'} size={24} />
              </div>
            )}
          </div>
          <div className="rounded-lg border border-secondary-600 bg-secondary-50 px-3 py-1 text-secondary-600">
            {problem.subject}
          </div>
        </div>
        <span className="text-2xl font-semibold">{problem.question}</span>
      </div>
      {/* 답안 선택 섹션 */}
      <ExamAnswer
        questionType={problem.questionType}
        chosenAnswer={answers[problem.problemId]}
        onSelectOption={handleOptionClick}
        onTextAnswerChange={handleTextChange}
        disabled={isSolutionPage}
        problemId={problem.problemId}
      />
    </div>
  );
};

export default ExamProblem;
