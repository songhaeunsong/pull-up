'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
const chartData = [
  { category: '컴퓨터구조', rate: 86 },
  { category: '알고리즘', rate: 5 },
  { category: '운영체제', rate: 37 },
  { category: '데이터베이스', rate: 73 },
  { category: '네트워크', rate: 29 },
  { category: '자료구조', rate: 14 },
];

const chartConfig = {
  rate: {
    label: '점수',
    color: '#6356f8',
  },
} satisfies ChartConfig;

const Analysis = () => {
  return (
    <ChartContainer config={chartConfig} className="mx-auto flex h-full w-full">
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="category" />
        <PolarGrid />
        <Radar dataKey="rate" fill={chartConfig.rate.color} fillOpacity={0.4} />
      </RadarChart>
    </ChartContainer>
  );
};

export default Analysis;
