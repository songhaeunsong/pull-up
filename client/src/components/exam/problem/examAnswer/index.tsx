import AnswerOption from '../answeroption';
interface ExamAnswerProps {
  questionType: 'objective' | 'subjective';
  options: { content: string; state: 'default' | 'selected' | 'wrong' | 'correct' }[];
  chosenAnswer?: string;
  disabled?: boolean;
  onSelectOption?: (index: number) => void;
  onTextAnswerChange?: (answer: string) => void;
}

const ExamAnswer = ({
  questionType,
  options,
  chosenAnswer = '',
  onSelectOption,
  onTextAnswerChange,
  disabled = false,
}: ExamAnswerProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      {questionType === 'objective' ? (
        // 객관식 문제
        options.map((option, index) => (
          <AnswerOption
            key={index}
            id={index + 1}
            content={option.content}
            state={option.state ?? 'default'}
            onClick={() => onSelectOption?.(index)}
            disabled={disabled}
          />
        ))
      ) : (
        // 주관식 문제
        <textarea
          placeholder="정답을 입력하세요."
          className="w-full resize-none rounded-lg border bg-stone-50 px-4 py-2 text-xl text-stone-950 placeholder-stone-500 focus:outline-none"
          value={chosenAnswer}
          disabled={disabled}
          onChange={(e) => onTextAnswerChange?.(e.target.value)}
        />
      )}
    </div>
  );
};

export default ExamAnswer;
