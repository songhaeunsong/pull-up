interface GameScoreBoardProps {
  player: number;
  currentScore: number;
}

const GameScoreBoard = ({ player, currentScore }: GameScoreBoardProps) => {
  const myPlayerNumber = 2;

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <h3 className="text-3xl font-bold text-primary-600">{player}P</h3>
        {myPlayerNumber === player && <div className="rounded-full bg-primary-500 p-1 font-bold text-white">Me</div>}
      </div>
      <div>{currentScore}</div>
    </div>
  );
};
export default GameScoreBoard;
