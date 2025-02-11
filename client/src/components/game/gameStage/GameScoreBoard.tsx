import { Player } from '@/types/game';

interface GameScoreBoardProps {
  player: Player;
}

const GameScoreBoard = ({ player }: GameScoreBoardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-bold text-primary-600 md:text-2xl">{player.name}</h3>
      </div>
      <div>{player.score}</div>
    </div>
  );
};
export default GameScoreBoard;
