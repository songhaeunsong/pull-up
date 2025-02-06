import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useGetCorrectRate } from '@/api/exam';

const chartConfig = {
  rate: {
    label: '점수',
    color: '#6356f8',
  },
} satisfies ChartConfig;

const Analysis = () => {
  const { data: analysisData, isLoading, isError } = useGetCorrectRate();

  if (isLoading) return <>불러오는 중...</>;
  if (isError || !analysisData) return <>차트 불러오기에 실패했어요</>;

  return (
    <ChartContainer config={chartConfig} className="mx-auto flex h-full w-full">
      <RadarChart data={analysisData.examStrengthDtos}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="category" />
        <PolarGrid />
        <Radar dataKey="rate" fill={chartConfig.rate.color} fillOpacity={0.4} />
      </RadarChart>
    </ChartContainer>
  );
};

export default Analysis;
