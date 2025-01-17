import ActivityCalendar, { Activity, DayIndex } from 'react-activity-calendar';

const Streak = () => {
  const data: Activity[] = [
    { count: 1, date: '2024-11-30', level: 1 },
    { count: 1, date: '2024-12-01', level: 0 },
  ];

  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  const weekStart = tomorrow.getDay() as DayIndex;

  return (
    <div className="h-[200px] w-[500px]">
      <ActivityCalendar
        data={data}
        weekStart={weekStart}
        blockSize={23}
        blockMargin={4}
        hideColorLegend={true}
        hideMonthLabels={true}
        hideTotalCount={true}
        colorScheme="light"
        maxLevel={1}
        theme={{
          light: ['#eeeff1', '#6356f8'],
        }}
      />
    </div>
  );
};

export default Streak;
