import { useGetId } from '@/api/game';
import ProgressBar from '@/components/common/progressBar';
import GameBoard from '@/components/game/gameStage/GameBoard';
import GameScoreBoard from '@/components/game/gameStage/GameScoreBoard';
import { useRoomStore } from '@/stores/roomStore';
import { useWebSocketStore } from '@/stores/useWebSocketStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameStage = () => {
  const navigate = useNavigate();
  const { roomId } = useRoomStore();
  const { roomInfo, sendMessage } = useWebSocketStore();

  const { data: idData, isLoading } = useGetId(roomId);

  useEffect(() => {
    if (roomInfo.gameRoomStatus === 'FINISHED') {
      sendMessage('app/card/check', {
        checkType: 'TIME_OVER',
      });

      navigate('/game/result');
    }
  }, [roomInfo]);

  if (!idData || isLoading) return <>불러오는 중...</>;

  return (
    <div className="flex h-full w-full flex-col gap-3 bg-Main p-4 pt-[106px] sm:pt-[85px] md:p-8 md:pt-[84px]">
      <div className="flex items-center gap-3 md:gap-6">
        <ProgressBar initialTime={60} />
      </div>
      <div className="grid h-full w-full grid-rows-[3fr_1fr] gap-3 md:grid-cols-[2.5fr_1fr] md:grid-rows-1 md:gap-7">
        <GameBoard playerNumber={idData.playerNumber} problems={roomInfo.problemCardWithoutCardIds} />
        <div className="flex flex-col">
          <div className="grid grow grid-cols-2 gap-3 md:grid-cols-1 md:grid-rows-2 md:gap-7">
            {idData.playerNumber === 1 ? (
              <>
                <GameScoreBoard player={roomInfo.player2P} />
                <GameScoreBoard player={roomInfo.player1P} />
              </>
            ) : (
              <>
                <GameScoreBoard player={roomInfo.player1P} />
                <GameScoreBoard player={roomInfo.player2P} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameStage;
