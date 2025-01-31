import { cn } from '@/lib/utils';
import { Card } from '@/types/game';

interface GameCardProps {
  card: Card;
  isSelected: boolean;
  onClick: () => void;
}

const TEXT_SIZE = {
  answer: 'text-xl bg-white',
  question: 'text-base bg-white',
};

const GameCard = ({ card, isSelected, onClick }: GameCardProps) => {
  return (
    <>
      {card.disabled ? (
        <div className="m-1 rounded-md bg-primary-600 p-2"></div>
      ) : (
        <div
          className={cn(
            { [`border-[#7aff51]`]: isSelected, [`border-white`]: !isSelected },
            TEXT_SIZE[card.type],
            'm-1 flex cursor-pointer items-center justify-center rounded-md border-4 p-2',
          )}
          onClick={onClick}
        >
          <p>{card.content}</p>
        </div>
      )}
    </>
  );
};
export default GameCard;
