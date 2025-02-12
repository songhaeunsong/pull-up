import { useGetPlayerType } from '@/api/game';
import ProgressBar from '@/components/common/progressBar';
import GameBoard from '@/components/game/gameStage/GameBoard';
import GameScoreBoard from '@/components/game/gameStage/GameScoreBoard';
import { useRoomStore } from '@/stores/roomStore';
import { useWebSocketStore } from '@/stores/useWebSocketStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameStage = () => {
  const { roomId } = useRoomStore();
  const { updateSubscription, roomInfo, sendMessage } = useWebSocketStore();
  const navigate = useNavigate();

  const { data: playerTypeData, isPending, isError } = useGetPlayerType(roomId);

  useEffect(() => {
    if (isPending || isError) return;

    if (roomId) {
      console.log('구독, ', playerTypeData.playerType);
      updateSubscription(roomId, 'game');
      setTimeout(() => {
        sendMessage('/app/card/check', {
          checkType: 'INIT',
          roomId,
          playerType: playerTypeData.playerType,
        });
      }, 800);
    }
  }, [roomId, playerTypeData]);

  const handleTimeOver = () => {
    console.log('time over');
    sendMessage('/app/card/check', {
      checkType: 'TIME_OVER',
      roomId,
    });
  };

  useEffect(() => {
    if (roomInfo.gameRoomStatus === 'FINISHED') {
      navigate('/game/result');
    }
  }, [roomInfo]);

  if (!playerTypeData || isPending) return <>불러오는 중...</>;

  return (
    <div className="flex h-full w-full flex-col gap-3 bg-Main p-4 pt-[106px] sm:pt-[85px] md:p-8 md:pt-[84px]">
      <div className="flex items-center gap-3 md:gap-6">
        <ProgressBar initialTime={60} onTimeOver={handleTimeOver} />
      </div>
      <div className="grid h-full w-full grid-rows-[3fr_1fr] gap-3 md:grid-cols-[2.5fr_1fr] md:grid-rows-1 md:gap-7">
        <GameBoard playerType={playerTypeData.playerType} problems={roomInfo.problemCardWithoutCardIds} />
        <div className="flex flex-col">
          <div className="grid grow grid-cols-2 gap-3 md:grid-cols-1 md:grid-rows-2 md:gap-7">
            {playerTypeData.playerType === 'player1P' ? (
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
