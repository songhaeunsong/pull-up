import ActivityCalendar, { Activity, DayIndex } from 'react-activity-calendar';

const Streak = () => {
  const data: Activity[] = [
    { count: 1, date: '2024-11-30', level: 1 },
    { count: 2, date: '2024-12-01', level: 2 },
    { count: 0, date: '2024-12-02', level: 0 },
    { count: 3, date: '2024-12-03', level: 2 },
    { count: 1, date: '2024-12-04', level: 1 },
    { count: 4, date: '2024-12-05', level: 3 },
    { count: 2, date: '2024-12-06', level: 2 },
    { count: 1, date: '2024-12-07', level: 1 },
    { count: 5, date: '2024-12-08', level: 3 },
    { count: 0, date: '2024-12-09', level: 0 },
    { count: 3, date: '2024-12-10', level: 2 },
    { count: 2, date: '2024-12-11', level: 2 },
    { count: 1, date: '2024-12-12', level: 1 },
    { count: 4, date: '2024-12-13', level: 3 },
    { count: 0, date: '2024-12-14', level: 0 },
    { count: 2, date: '2024-12-15', level: 2 },
    { count: 3, date: '2024-12-16', level: 2 },
    { count: 1, date: '2024-12-17', level: 1 },
    { count: 5, date: '2024-12-18', level: 3 },
    { count: 2, date: '2024-12-19', level: 2 },
    { count: 0, date: '2024-12-20', level: 0 },
    { count: 3, date: '2024-12-21', level: 2 },
    { count: 1, date: '2024-12-22', level: 1 },
    { count: 4, date: '2024-12-23', level: 3 },
    { count: 2, date: '2024-12-24', level: 2 },
    { count: 1, date: '2024-12-25', level: 1 },
    { count: 5, date: '2024-12-26', level: 3 },
    { count: 0, date: '2024-12-27', level: 0 },
    { count: 3, date: '2024-12-28', level: 2 },
    { count: 2, date: '2024-12-29', level: 2 },
    { count: 1, date: '2024-12-30', level: 1 },
    { count: 4, date: '2024-12-31', level: 3 },
    { count: 0, date: '2025-01-01', level: 0 },
    { count: 2, date: '2025-01-02', level: 2 },
    { count: 3, date: '2025-01-03', level: 2 },
    { count: 1, date: '2025-01-04', level: 1 },
    { count: 5, date: '2025-01-05', level: 3 },
    { count: 2, date: '2025-01-06', level: 2 },
    { count: 0, date: '2025-01-07', level: 0 },
    { count: 3, date: '2025-01-08', level: 2 },
    { count: 1, date: '2025-01-09', level: 1 },
    { count: 4, date: '2025-01-10', level: 3 },
    { count: 2, date: '2025-01-11', level: 2 },
    { count: 1, date: '2025-01-12', level: 1 },
    { count: 5, date: '2025-01-13', level: 3 },
    { count: 0, date: '2025-01-14', level: 0 },
    { count: 3, date: '2025-01-15', level: 2 },
    { count: 2, date: '2025-01-16', level: 2 },
    { count: 1, date: '2025-01-17', level: 1 },
    { count: 4, date: '2025-01-18', level: 3 },
  ];
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  const weekStart = tomorrow.getDay() as DayIndex;

  return (
    <ActivityCalendar
      data={data}
      weekStart={weekStart}
      blockSize={23}
      blockMargin={4}
      hideColorLegend={true}
      hideMonthLabels={true}
      hideTotalCount={true}
      colorScheme="light"
      maxLevel={4}
      theme={{
        light: ['#eeeff1', '#6356f8'],
      }}
    />
  );
};

export default Streak;
