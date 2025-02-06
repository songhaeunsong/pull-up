import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useGetScore } from '@/api/exam';

const chartConfig = {
  score: {
    label: '점수',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

const Score = () => {
  const { data: scoreData, isLoading, isError } = useGetScore();

  if (isLoading) return <>불러오는 중...</>;
  if (isError || !scoreData) return <>차트 불러오기에 실패했어요</>;
  if (!scoreData.examScoreDtos.length) return <>모의고사를 풀고 점수를 확인하세요!</>;
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={scoreData.examScoreDtos}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="score" fill={chartConfig.score.color} radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default Score;
