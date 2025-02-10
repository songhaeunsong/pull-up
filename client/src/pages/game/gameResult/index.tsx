import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { useRoomStore } from '@/stores/roomStore';
import { useGetGameResult } from '@/api/game';

const GameResultPage = () => {
  const navigate = useNavigate();
  const { setRoomId } = useRoomStore();

  const { data: gameResultData, isPending, isError } = useGetGameResult();

  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedOpponentScore, setAnimatedOpponentScore] = useState(0);
  const [isVisibleResult, setIsVisibleResult] = useState(false);

  const handleGoBack = () => {
    setRoomId('');
    navigate('/game');
  };

  useEffect(() => {
    if (!gameResultData) return;

    const animateValue = (start: number, end: number, interval: number, setter: (value: number) => void) => {
      let currentValue = start;
      setter(currentValue);

      const step = () => {
        if (currentValue < end) {
          currentValue += 1;
          setter(currentValue);
          setTimeout(step, interval);
        } else {
          setIsVisibleResult(true);
        }
      };

      setTimeout(step, interval);
    };

    animateValue(0, gameResultData.score, 200, setAnimatedScore);
    animateValue(0, gameResultData.opponentScore, 200, setAnimatedOpponentScore);
  }, [gameResultData]);

  useEffect(() => {
    if (!gameResultData) return;

    if (isVisibleResult) {
      if (gameResultData.gameRoomResultStatus === 'WIN') {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 },
        });
      }
    }
  }, [isVisibleResult]);

  if (isPending) return <>불러오는 중</>;
  if (isError) return <>불러오기 실패</>;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-Main p-8 pt-24">
      <h3
        className={cn(
          'transform text-7xl font-bold text-primary-500 transition-opacity duration-700 ease-out',
          isVisibleResult ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        )}
      >
        {gameResultData.gameRoomResultStatus}
      </h3>
      {!gameResultData.isForfeitGame && (
        <div className="flex items-center justify-center gap-7">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-lg font-medium">{gameResultData.name}</span>
            <span className="text-3xl font-semibold text-primary-700">{animatedScore}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-lg font-medium">{gameResultData.opponentName}</span>
            <span className="text-3xl font-semibold text-primary-700">{animatedOpponentScore}</span>
          </div>
        </div>
      )}
      {gameResultData.isForfeitGame && (
        <span>
          {gameResultData[gameResultData.gameRoomResultStatus === 'WIN' ? 'opponentName' : 'name']}
          님의 기권으로 게임이 종료되었습니다.
        </span>
      )}
      <Button variant="transparent" className="mt-6" onClick={handleGoBack}>
        돌아가기
      </Button>
    </div>
  );
};

export default GameResultPage;
