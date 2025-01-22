interface ProblemStatusButtonProps {
  text: string;
  status?: 'default' | 'solved' | 'wrong' | 'correct';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProblemStatusButton = ({ text, onClick, status = 'default' }: ProblemStatusButtonProps) => {
  const COLOR_CLASSES = {
    default: 'bg-stone-100 text-stone-700',
    solved: 'bg-primary-500 text-white',
    correct: 'bg-secondary-50 text-secondary-600 border border-secondary-600',
    wrong: 'bg-error-100 text-error-500 border border-error-500',
  };

  return (
    <button onClick={onClick} className={`${COLOR_CLASSES[status]} h-12 w-12 rounded-lg text-lg font-semibold`}>
      {text}
    </button>
  );
};

export default ProblemStatusButton;
