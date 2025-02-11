import useTimer from '@/hooks/useTimer';
import { convertSecondsHHMMSS } from '@/utils/convertSecondsToHHMMSS';

interface TimerProps {
  initialTime: number;
  onTimeOver: () => void;
}

const Timer = ({ initialTime, onTimeOver }: TimerProps) => {
  const { timeLeft } = useTimer(initialTime, onTimeOver);

  return <span>{convertSecondsHHMMSS(timeLeft)}</span>;
};

export default Timer;
