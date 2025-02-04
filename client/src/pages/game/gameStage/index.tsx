import { useGetId } from '@/api/game';
import GameBoard from '@/components/game/gameStage/GameBoard';
import GameScoreBoard from '@/components/game/gameStage/GameScoreBoard';
import useWebSocket from '@/hooks/useWebSocket';

const GameStage = () => {
  const { roomInfo } = useWebSocket();

  const { data: idData, isLoading } = useGetId(roomInfo.roomId);

  if (isLoading || !idData) return <>불러오는 중...</>;
  return (
    <div className="grid h-full w-full grid-cols-[2.5fr_1fr] gap-7 bg-Main p-8">
      <GameBoard playerNumber={idData.playerNumber} problems={roomInfo.problems} />
      <div className="grid grid-rows-2 gap-7">
        {idData.playerNumber === 1 ? (
          <>
            <GameScoreBoard player="player2P" />
            <GameScoreBoard player="player1P" />
          </>
        ) : (
          <>
            <GameScoreBoard player="player1P" />
            <GameScoreBoard player="player2P" />
          </>
        )}
      </div>
    </div>
  );
};
export default GameStage;
