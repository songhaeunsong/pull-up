import { useGetId } from '@/api/game';
import GameBoard from '@/components/game/gameStage/GameBoard';
import GameScoreBoard from '@/components/game/gameStage/GameScoreBoard';
import { Button } from '@/components/ui/button';
import useWebSocket from '@/hooks/useWebSocket';
import { useRoomStore } from '@/stores/roomStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameStage = () => {
  const navigate = useNavigate();

  const { roomId } = useRoomStore();
  const { roomInfo, sendMessage } = useWebSocket();

  const { data: idData, isLoading } = useGetId(roomId);

  const handleForfeit = () => {
    sendMessage('app/??');
  };

  useEffect(() => {
    if (roomInfo.roomStatus === 'FINISHED') {
      navigate('/game/result');
    }
  }, [roomInfo]);

  if (!idData || isLoading) return <>불러오는 중...</>;

  return (
    <div className="grid h-full w-full grid-cols-[2.5fr_1fr] gap-7 bg-Main p-8 pt-24">
      <GameBoard playerNumber={idData.playerNumber} problems={roomInfo.problemCardWithoutCardIds} />
      <div>
        <Button onClick={handleForfeit}>기권하기</Button>
        <div className="grid grid-rows-2 gap-7">
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
  );
};
export default GameStage;
