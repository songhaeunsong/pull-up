interface AnswerOptionProps {
  id: number;
  content: string; // 옵션 내용
  state: 'default' | 'selected' | 'wrong' | 'correct';
  onClick: () => void; // 클릭 핸들러
  disabled?: boolean;
}

const AnswerOption = ({ id, content, onClick, state, disabled = false }: AnswerOptionProps) => {
  const COLOR_CLASSES = {
    default: 'border-primary-200',
    selected: 'border-primary-500 text-primary-500 bg-primary-50',
    wrong: 'border-error-600 text-error-500 bg-error-100',
    correct: 'border-secondary-600 text-secondary-600 bg-secondary-50',
  };

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`w-full rounded-xl border px-8 py-3 text-start text-xl ${COLOR_CLASSES[state]} `}
    >
      {id}. {content}
    </button>
  );
};

export default AnswerOption;
