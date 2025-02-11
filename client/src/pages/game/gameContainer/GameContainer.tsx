import GameModals from '@/components/game/GameModal';
import useResponsive from '@/hooks/useResponsive';

const GameContainer = () => {
  const { isMobile } = useResponsive();

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-white via-Main to-primary-300">
      <div>
        <div className="w-[70px]">
          <img src="/assets/images/card.png" alt="card" />
        </div>
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-5xl font-extrabold">
            카드게임으로
            {isMobile ? <br /> : ' '}
            공부하기
          </h3>
          <GameModals />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
