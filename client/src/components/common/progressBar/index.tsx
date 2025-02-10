import { Progress } from '@/components/ui/progress';
import useTimer from '@/hooks/useTimer';

interface progressBar {
  initialTime: number;
}

const ProgressBar = ({ initialTime }: progressBar) => {
  const handleTimeOver = () => {};

  const { timeLeft } = useTimer(initialTime, handleTimeOver);

  return <Progress value={(timeLeft / 3) * 5} className="w-full" />;
};

export default ProgressBar;
