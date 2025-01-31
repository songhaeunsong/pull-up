import { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number; // 초 단위로 전달 (25분 = 1500)
  onTimeOver: () => void;
}

const Timer = ({ initialTime, onTimeOver }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          onTimeOver();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [onTimeOver]);

  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return <span>{formatTime(timeLeft)}</span>;
};

export default Timer;
