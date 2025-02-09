import { useGetGameResult } from '@/api/game';

const GameResultPage = () => {
  const { data: gameResultData, isPending, isError } = useGetGameResult();

  if (isPending) return <>불러오는 중</>;
  if (isError) return <>불러오기 실패</>;

  return (
    <div className="grid h-full w-full grid-cols-[2.5fr_1fr] gap-7 bg-Main p-8 pt-24">
      {gameResultData.gameRoomResultStatus === 'WIN' ? (
        <>
          <span>{gameResultData.winnerName} WIN!</span>
        </>
      ) : (
        <>
          <span>DRAW!</span>
        </>
      )}
    </div>
  );
};

export default GameResultPage;
