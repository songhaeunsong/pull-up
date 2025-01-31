import { useGetProblem } from '@/api/game';
import GameBoard from '@/components/game/gameStage/GameBoard';
import GameScoreBoard from '@/components/game/gameStage/GameScoreBoard';
import useWebSocket from '@/hooks/useWebSocket';
import { useState } from 'react';

const GameStage = () => {
  const { roomStatus } = useWebSocket();
  const { data: problems, isLoading } = useGetProblem(roomStatus);

  const [myId, setMyId] = useState(1); // 임시, 서버에서 받아오기 (아이디, 이름)

  if (isLoading || !problems) return <>카드를 불러오는 중 ...</>;

  console.log(problems);
  return (
    <div className="grid h-full w-full grid-cols-[2.5fr_1fr] gap-7 bg-Main p-8">
      <GameBoard problems={problems} />
      <div className="grid grid-rows-2 gap-7">
        {myId === 1 ? (
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
