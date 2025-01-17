import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
const chartData = [{ win: 7, lose: 3 }];

const chartConfig = {
  win: {
    label: '승리',
    color: '#6356f8',
  },
  lose: {
    label: '패배',
    color: '#eeeff1',
  },
} satisfies ChartConfig;

const WinningRate = () => {
  const rate = Math.round((100 * chartData[0].win) / (chartData[0].lose + chartData[0].win));

  return (
    <Card className="flex flex-col justify-center">
      <CardHeader className="items-center pb-0">
        <CardTitle>승률</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer config={chartConfig} className="mx-auto h-[190px] w-full max-w-[250px] overflow-hidden">
          <RadialBarChart className="translate-y-10" data={chartData} endAngle={180} innerRadius={80} outerRadius={130}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-foreground text-2xl font-bold">
                          {rate}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="lose"
              fill={chartConfig.lose.color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="win"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.win.color}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default WinningRate;
