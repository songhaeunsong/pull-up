import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { useRoomStore } from '@/stores/roomStore';
import { OPPONENT } from '@/constants/game';
import { useWebSocketStore } from '@/stores/useWebSocketStore';
import usePrompt from '@/hooks/useNavigationBlocker';
import NavigationDialog from '@/components/common/navigationDialog';
import { useGetPlayerType } from '@/api/game';
import { toast } from 'react-toastify';

const GameResultPage = () => {
  const navigate = useNavigate();

  const { isBlocked, handleProceed, handleCancel, setException } = usePrompt();

  const { setRoomId, roomId } = useRoomStore();
  const { updateSubscription, gameResult, sendMessage, connectWebSocket, disconnectWebSocket } = useWebSocketStore();

  const { data: playerTypeData, isPending, isError } = useGetPlayerType(roomId);

  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedOpponentScore, setAnimatedOpponentScore] = useState(0);
  const [isVisibleResult, setIsVisibleResult] = useState(false);
  const [isVisibleWinner, setIsVisibleWinner] = useState(false);

  const handleGoBack = () => {
    setException();
    setRoomId('');
    navigate('/game');
  };

  const handleGameProceed = () => {
    handleGoBack();
    handleProceed();
  };

  useEffect(() => {
    if (isError) {
      setException();
      navigate('/game');

      toast('게임이 종료되어 대기 화면으로 이동합니다.');
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (roomId) {
      updateSubscription(roomId, 'result');
      setTimeout(() => {
        sendMessage(`/app/game/${roomId}/result`, {});
        setIsVisibleResult(true);
      }, 3000);
    }
  }, [roomId]);

  useEffect(() => {
    if (isPending || isError) return;

    const animateValue = (start: number, end: number, interval: number, setter: (value: number) => void) => {
      let currentValue = start;
      setter(currentValue);

      const step = () => {
        if (currentValue < end) {
          currentValue += 1;
          setter(currentValue);
          setTimeout(step, interval);
        } else {
          setIsVisibleWinner(true);
        }
      };

      setTimeout(step, interval);
    };

    animateValue(0, gameResult[playerTypeData.playerType].score, 200, setAnimatedScore);
    animateValue(0, gameResult[OPPONENT[playerTypeData.playerType]].score, 200, setAnimatedOpponentScore);
  }, [gameResult]);

  useEffect(() => {
    if (isPending || isError || !gameResult.player1P.name) return;

    if (isVisibleWinner) {
      if (gameResult[playerTypeData.playerType].status === 'WIN') {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 },
        });
      }
    }
  }, [isVisibleWinner, gameResult]);

  if (isPending || isError) return <>불러오는 중</>;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-Main p-8 pt-24">
      {!isVisibleResult ? (
        <>누가 이겼을까요?</>
      ) : (
        <>
          <h3
            className={cn(
              'transform text-7xl font-bold text-primary-500 transition-opacity duration-700 ease-out',
              isVisibleWinner ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
            )}
          >
            {gameResult[playerTypeData.playerType].status}
          </h3>
          {!gameResult.isForfeit && (
            <div className="flex items-center justify-center gap-7">
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-lg font-medium">{gameResult[playerTypeData.playerType].name}</span>
                <span className="text-3xl font-semibold text-primary-700">{animatedScore}</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-lg font-medium">{gameResult[OPPONENT[playerTypeData.playerType]].name}</span>
                <span className="text-3xl font-semibold text-primary-700">{animatedOpponentScore}</span>
              </div>
            </div>
          )}
          {gameResult.isForfeit && (
            <span>
              {gameResult[playerTypeData.playerType].status === 'WIN'
                ? gameResult[OPPONENT[playerTypeData.playerType]].name
                : gameResult[playerTypeData.playerType].name}
              님의 기권으로 게임이 종료되었습니다.
            </span>
          )}
          <Button variant="transparent" className="mt-6" onClick={handleGoBack}>
            돌아가기
          </Button>
        </>
      )}
      <NavigationDialog
        isOpen={isBlocked}
        onProceed={handleGameProceed}
        onCancel={handleCancel}
        title="게임 결과 페이지를 나가시겠습니까?"
        description=""
      />
    </div>
  );
};

export default GameResultPage;
