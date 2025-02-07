import { cn } from '@/lib/utils';

interface ProblemStatusButtonProps {
  index: number;
  status?: 'default' | 'solved' | 'wrong' | 'correct';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProblemStatusButton = ({ index, onClick, status = 'default' }: ProblemStatusButtonProps) => {
  const COLOR_CLASSES = {
    default: 'bg-stone-100 text-stone-700',
    solved: 'bg-primary-500 text-white',
    correct: 'bg-secondary-50 text-secondary-600 border border-secondary-600',
    wrong: 'bg-error-100 text-error-500 border border-error-500',
  };

  return (
    <button
      onClick={onClick}
      className={cn(COLOR_CLASSES[status], 'h-10 w-10 rounded-lg text-base font-semibold lg:h-12 lg:w-12 lg:text-lg')}
    >
      {index}
    </button>
  );
};

export default ProblemStatusButton;
