import GameModals from '@/components/game/gameModals';

const GameContainer = () => {
  return (
    <div className="grid h-full w-full grid-cols-[1.3fr_1fr] items-center justify-center bg-Main pl-8">
      <div className="flex justify-end">
        <div>
          <div className="w-20">
            <img src="/assets/images/card.png" alt="card" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-4xl font-extrabold md:text-5xl lg:text-6xl">카드게임으로 공부하기</h3>
            <GameModals />
          </div>
        </div>
      </div>
      <div className="flex h-full w-full justify-end overflow-hidden">
        <div className="flex aspect-square h-[120vh] translate-y-[-40vh] transform items-center justify-center rounded-full bg-primary-500 sm:translate-x-[680px] md:translate-x-[600px] lg:translate-x-[480px]">
          <div className="aspect-square w-[60%] rounded-full bg-Main"></div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
