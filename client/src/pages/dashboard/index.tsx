import Streak from '@/components/dashboard/charts/Streak';
import ChartContainer from './ChartContainer';
import Score from '@/components/dashboard/charts/Score';
import Analysis from '@/components/dashboard/charts/Analysis';
import WinningRate from '@/components/dashboard/charts/WinningRate';
import useResponsive from '@/hooks/useResponsive';
import MobileDashboardContainer from './MobileDashboardContainer';

const DashBoardPage = () => {
  const { isMobile, isTabletMd } = useResponsive();
  return (
    <div className="w-full">
      {isMobile || isTabletMd ? (
        <MobileDashboardContainer />
      ) : (
        <div className="grid w-full grid-cols-[2fr_1fr] gap-4 rounded-2xl bg-Main shadow-sm">
          <div className="grid grid-rows-[1.5fr_1fr] gap-4">
            <div className="flex flex-col rounded-2xl bg-white p-5">
              <ChartContainer icon="feedback" title="오늘의 문제 및 피드백">
                <div>오늘의 문제 및 피드백</div>
              </ChartContainer>
            </div>
            <div className="grid grid-cols-[1fr_1fr] gap-4">
              <div className="flex flex-col rounded-2xl bg-white p-5">
                <ChartContainer icon="time" title="풀이 현황">
                  <Streak />
                </ChartContainer>
              </div>
              <div className="flex flex-col rounded-2xl bg-white p-5">
                <ChartContainer icon="crown" title="게임 승률">
                  <WinningRate />
                </ChartContainer>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-[1.5fr_1fr] gap-4">
            <div className="flex flex-col rounded-2xl bg-white p-5">
              <ChartContainer icon="smile" title="나의 강점 분석">
                <Analysis />
              </ChartContainer>
            </div>
            <div className="flex flex-col rounded-2xl bg-white p-5">
              <ChartContainer icon="score" title="점수 현황">
                <Score />
              </ChartContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoardPage;
