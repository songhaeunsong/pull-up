import { useState } from 'react';
import GameCard from './GameCard';

export interface Card {
  cardId: number;
  type: 'question' | 'answer';
  isTaken: boolean;
  content: string;
}

const cards: Card[] = [
  { cardId: 1, type: 'question', isTaken: false, content: 'What is the capital of France?' },
  { cardId: 1, type: 'answer', isTaken: false, content: 'Paris' },
  { cardId: 2, type: 'question', isTaken: true, content: 'What is 2 + 2?' },
  { cardId: 2, type: 'answer', isTaken: false, content: '4' },
  { cardId: 3, type: 'question', isTaken: false, content: 'What is the boiling point of water in Celsius?' },
  { cardId: 3, type: 'answer', isTaken: false, content: '100' },
  { cardId: 4, type: 'question', isTaken: false, content: 'Who wrote "Romeo and Juliet"?' },
  { cardId: 4, type: 'answer', isTaken: false, content: 'William Shakespeare' },
  { cardId: 5, type: 'question', isTaken: true, content: 'What is the chemical symbol for gold?' },
  { cardId: 5, type: 'answer', isTaken: false, content: 'Au' },
  { cardId: 6, type: 'question', isTaken: false, content: 'Which planet is known as the Red Planet?' },
  { cardId: 6, type: 'answer', isTaken: false, content: 'Mars' },
  { cardId: 7, type: 'question', isTaken: false, content: 'How many continents are there on Earth?' },
  { cardId: 7, type: 'answer', isTaken: false, content: '7' },
  { cardId: 8, type: 'question', isTaken: false, content: 'What is the largest ocean on Earth?' },
  { cardId: 8, type: 'answer', isTaken: false, content: 'Pacific Ocean' },
];

const GameBoard = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleClickCard = (index: number) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter((i) => i !== index));
      return;
    }

    if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, index]);
    }

    if (selectedCards.length === 1) {
      if (cards[selectedCards[0]].cardId === cards[index].cardId) {
        console.log('정답 보내기', [...selectedCards, index]);
      }
      setTimeout(() => setSelectedCards([]), 500);
    }
  };
  return (
    <div className="grid grid-cols-4 grid-rows-4 rounded-md bg-primary-400 p-1 shadow-sm">
      {cards.map((card, i) => (
        <GameCard
          key={i}
          card={card}
          playerColor="#db00c9"
          isSelected={selectedCards.includes(i)}
          onClick={() => handleClickCard(i)}
        />
      ))}
    </div>
  );
};
export default GameBoard;
