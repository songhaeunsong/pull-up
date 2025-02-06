import { useState } from 'react';
import GameCard from './GameCard';
import { Card } from '@/types/game';
import useWebSocket from '@/hooks/useWebSocket';

interface GameBoardProps {
  playerNumber: 1 | 2;
  problems: Card[];
}
const GameBoard = ({ playerNumber, problems }: GameBoardProps) => {
  const { sendMessage, roomInfo } = useWebSocket();

  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const checkCardPair = (cardIndex1: number, cardIndex2: number) => {
    if (problems[cardIndex1].cardId === problems[cardIndex2].cardId) {
      problems[cardIndex1].disabled = true;
      problems[cardIndex2].disabled = true;

      sendMessage('/app/card/submit', {
        roomId: roomInfo.roomId,
        playerId: playerNumber,
        problemNumber: problems[cardIndex1].cardId,
      });
    }
  };

  const handleClickCard = (index: number) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter((i) => i !== index));
      return;
    }

    if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, index]);
    }

    if (selectedCards.length === 1) {
      checkCardPair(selectedCards[0], index);
      setTimeout(() => setSelectedCards([]), 300);
    }
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 rounded-md bg-primary-400 p-1 shadow-sm">
      {problems.map((card, i) => (
        <GameCard key={i} card={card} isSelected={selectedCards.includes(i)} onClick={() => handleClickCard(i)} />
      ))}
    </div>
  );
};
export default GameBoard;
