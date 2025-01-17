'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>강점 분석</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto flex max-h-[250px] min-h-[200px]">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid />
            <Radar dataKey="rate" fill={chartConfig.rate.color} fillOpacity={0.4} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Analysis;
