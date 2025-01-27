import { useExamStore } from '@/stores/ExamStore';
import AnswerOption from '../answeroption';
interface ExamAnswerProps {
  problemId: number;
  questionType: 'SHORT_ANSWER' | 'MULTIPLE_CHOICE';
  //options: { text: string; state: 'default' | 'selected' | 'wrong' | 'correct' }[];
  chosenAnswer?: string;
  disabled?: boolean;
  onSelectOption?: (index: number) => void;
  onTextAnswerChange?: (answer: string) => void;
}

const ExamAnswer = ({
  problemId,
  questionType,
  onSelectOption,
  onTextAnswerChange,
  disabled = false,
}: ExamAnswerProps) => {
  const { answers, options } = useExamStore();
  const chosenAnswer = answers[problemId] || '';
  const problemOptions = options[problemId] || [];
  console.log(problemOptions);

  return (
    <div className="flex w-full flex-col gap-3">
      {questionType === 'MULTIPLE_CHOICE' ? (
        // 객관식 문제
        problemOptions.map((option, index) => (
          <AnswerOption
            key={index}
            id={index + 1}
            content={option.text}
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
