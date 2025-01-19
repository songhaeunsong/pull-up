import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { time: '4회', score: 186 },
  { time: '5회', score: 305 },
  { time: '6회', score: 237 },
  { time: '7회', score: 73 },
  { time: '8회', score: 214 },
];

const chartConfig = {
  score: {
    label: '점수',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

const Score = () => {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={chartData}>
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
