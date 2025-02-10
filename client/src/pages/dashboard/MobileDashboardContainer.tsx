import Analysis from '@/components/dashboard/charts/Analysis';
import Score from '@/components/dashboard/charts/Score';
import Streak from '@/components/dashboard/charts/Streak';
import WinningRate from '@/components/dashboard/charts/WinningRate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChartContainer from './ChartContainer';
import DashboardFeedback from '@/components/dashboard/dashboardFeedback';

const ACTIVE_STYLE =
  'data-[state=active]:border-b-[3px] data-[state=active]:border-primary-500 data-[state=active]:text-primary-500';

const MobileDashboardContainer = () => {
  return (
    <Tabs defaultValue="today">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger className={ACTIVE_STYLE} value="today">
          오늘의 문제
        </TabsTrigger>
        <TabsTrigger className={ACTIVE_STYLE} value="streak">
          풀이 현황
        </TabsTrigger>
        <TabsTrigger className={ACTIVE_STYLE} value="score">
          점수 현황
        </TabsTrigger>
        <TabsTrigger className={ACTIVE_STYLE} value="analysis">
          강점 분석
        </TabsTrigger>
        <TabsTrigger className={ACTIVE_STYLE} value="winningRate">
          나의 승률
        </TabsTrigger>
      </TabsList>
      <TabsContent value="today" className="w-full">
        <div className="flex min-h-[300px] flex-col rounded-2xl bg-white p-5">
          <ChartContainer>
            <div className="flex items-center justify-center">
              <DashboardFeedback />
            </div>
          </ChartContainer>
        </div>
      </TabsContent>
      <TabsContent value="streak">
        <div className="flex min-h-[300px] flex-col rounded-2xl bg-white p-5">
          <ChartContainer>
            <Streak />
          </ChartContainer>
        </div>
      </TabsContent>
      <TabsContent value="score">
        <div className="flex min-h-[300px] flex-col rounded-2xl bg-white p-5">
          <ChartContainer>
            <Score />
          </ChartContainer>
        </div>
      </TabsContent>
      <TabsContent value="analysis">
        <div className="flex min-h-[300px] flex-col rounded-2xl bg-white p-5">
          <ChartContainer>
            <Analysis />
          </ChartContainer>
        </div>
      </TabsContent>
      <TabsContent value="winningRate">
        <div className="flex min-h-[300px] flex-col rounded-2xl bg-white p-5">
          <ChartContainer>
            <WinningRate />
          </ChartContainer>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MobileDashboardContainer;
