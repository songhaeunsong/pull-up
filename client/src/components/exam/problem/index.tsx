import ExamAnswer from './examAnswer';
import Icon from '@/components/common/icon';
import { useState } from 'react';

interface ExamProblemProps {
  problem: {
    id: number;
    content: string;
    subject: string;
    isBookmarked?: boolean;
    questionType: 'objective' | 'subjective';
    chosenAnswer?: string;
    options?: { content: string; state?: 'default' | 'selected' | 'wrong' | 'correct' }[];
  };
  disabled?: boolean;
  onSelectOption: (index: number) => void;
  onTextAnswerChange: (answer: string) => void;
}
const ExamProblem = ({ problem, disabled = false, onSelectOption, onTextAnswerChange }: ExamProblemProps) => {
  const [options, setOptions] = useState(
    (problem.options ?? []).map((option) => ({
      ...option,
      state: option.state ?? 'default',
    })),
  );

  const [bookmark, setBookmark] = useState(problem.isBookmarked ?? false);

  const handleOptionClick = (index: number) => {
    if (disabled) return;
    setOptions((prevOptions) =>
      prevOptions.map((option, idx) => ({
        ...option,
        state: idx === index ? 'selected' : 'default',
      })),
    );
    onSelectOption(index);
  };

  const handleBookmarkClick = () => {
    setBookmark((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-7 rounded-xl border border-primary-200 bg-white px-7 py-7">
      {/* 질문 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer items-center gap-2">
            <span className="text-2xl font-bold text-stone-900">문제 {problem.id}</span>
            {problem.isBookmarked !== undefined && (
              <div
                className={`cursor-pointer ${bookmark ? 'text-yellow-500' : 'text-gray-400'}`} // 북마크 상태에 따라 스타일 변경
                onClick={handleBookmarkClick}
              >
                <Icon id={bookmark ? 'bookmark' : 'bookmark-empty'} size={24} />
              </div>
            )}
          </div>
          <div className="rounded-lg border border-secondary-600 bg-secondary-50 px-3 py-1 text-secondary-600">
            {problem.subject}
          </div>
        </div>
        <span className="text-2xl font-semibold">{problem.content}</span>
      </div>
      {/* 답안 선택 섹션 */}
      <ExamAnswer
        questionType={problem.questionType}
        options={options}
        chosenAnswer={problem.chosenAnswer}
        onSelectOption={handleOptionClick}
        onTextAnswerChange={onTextAnswerChange}
        disabled={disabled}
      />
    </div>
  );
};

export default ExamProblem;
