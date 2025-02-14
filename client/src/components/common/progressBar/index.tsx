import { Progress } from '@/components/ui/progress';
import useTimer from '@/hooks/useTimer';

interface progressBar {
  initialTime: number;
  onTimeOver?: () => void;
}

const ProgressBar = ({ initialTime, onTimeOver }: progressBar) => {
  const { timeLeft } = useTimer(initialTime, onTimeOver);

  return <Progress value={(timeLeft / 3) * 5} className="w-full" />;
};

export default ProgressBar;
