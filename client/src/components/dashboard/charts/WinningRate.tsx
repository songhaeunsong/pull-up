// const chartConfig = {
//   win: {
//     label: '승리',
//     color: '#6356f8',
//   },
//   lose: {
//     label: '패배',
//     color: '#eeeff1',
//   },
// } satisfies ChartConfig;

const WinningRate = () => {
  // const { data: winningRateData, isLoading, isError } = useGetWinningRate();

  // if (isLoading) return <>불러오는 중...</>;
  // if (isError || !winningRateData) return <>차트 불러오기에 실패했어요</>;

  return <>준비 중인 서비스에요!</>;

  //   return (
  //     <ChartContainer config={chartConfig} className="mx-auto h-[190px] w-full max-w-[250px] overflow-hidden">
  //       <RadialBarChart
  //         className="translate-y-10"
  //         data={[winningRateData.winningRate]}
  //         endAngle={180}
  //         innerRadius={80}
  //         outerRadius={130}
  //       >
  //         <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
  //         <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
  //           <Label
  //             content={({ viewBox }) => {
  //               if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
  //                 return (
  //                   <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
  //                     <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-foreground text-2xl font-bold">
  //                       {winningRateData.winningRate}%
  //                     </tspan>
  //                   </text>
  //                 );
  //               }
  //             }}
  //           />
  //         </PolarRadiusAxis>
  //         <RadialBar
  //           dataKey="lose"
  //           fill={chartConfig.lose.color}
  //           stackId="a"
  //           cornerRadius={5}
  //           className="stroke-transparent stroke-2"
  //         />
  //         <RadialBar
  //           dataKey="win"
  //           stackId="a"
  //           cornerRadius={5}
  //           fill={chartConfig.win.color}
  //           className="stroke-transparent stroke-2"
  //         />
  //       </RadialBarChart>
  //     </ChartContainer>
  //   );
};

export default WinningRate;
