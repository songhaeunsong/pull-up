import GameBoard from '@/components/game/gameStage/GameBoard';
import GameScoreBoard from '@/components/game/gameStage/gameScoreBoad';

const GameStage = () => {
  return (
    <div className="grid h-full w-full grid-cols-[2.5fr_1fr] gap-7 bg-Main p-8">
      <GameBoard />
      <div className="grid grid-rows-2 gap-7">
        <GameScoreBoard player={1} currentScore={1} />
        <GameScoreBoard player={2} currentScore={2} />
      </div>
    </div>
  );
};
export default GameStage;
