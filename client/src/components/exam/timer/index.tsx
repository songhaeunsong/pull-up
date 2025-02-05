import { useEffect, useState, useCallback, useRef } from 'react';

interface TimerProps {
  initialTime: number;
  onTimeOver: () => void;
}

const Timer = ({ initialTime, onTimeOver }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeOverRef = useRef(onTimeOver);

  useEffect(() => {
    onTimeOverRef.current = onTimeOver;
  }, [onTimeOver]);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          onTimeOverRef.current();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return <span>{formatTime(timeLeft)}</span>;
};

export default Timer;
