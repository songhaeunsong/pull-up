import { cn } from '@/lib/utils';
import { Card } from './GameBoard';

interface GameCardProps {
  card: Card;
  playerColor: string;
  isSelected: boolean;
  onClick: () => void;
}

const TEXT_SIZE = {
  answer: 'text-xl bg-white',
  question: 'text-base bg-white',
};

const GameCard = ({ card, playerColor, isSelected, onClick }: GameCardProps) => {
  return (
    <>
      {card.isTaken ? (
        <div className="m-1 rounded-md bg-primary-600 p-2"></div>
      ) : (
        <div
          className={cn(
            { [`border-[${playerColor}]`]: isSelected, [`border-white`]: !isSelected },
            TEXT_SIZE[card.type],
            'm-1 flex cursor-pointer items-center justify-center rounded-md border-2 p-2',
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
