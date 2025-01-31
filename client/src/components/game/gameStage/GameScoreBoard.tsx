import useWebSocket from '@/hooks/useWebSocket';

interface GameScoreBoardProps {
  player: 'player1P' | 'player2P';
}

const GameScoreBoard = ({ player }: GameScoreBoardProps) => {
  const { roomInfo } = useWebSocket();

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <h3 className="text-3xl font-bold text-primary-600">{roomInfo[player].name}</h3>
      </div>
      <div>{roomInfo[player].score}</div>
    </div>
  );
};
export default GameScoreBoard;
