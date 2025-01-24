import { useState, useEffect } from 'react';

export const useChipAnimation = () => {
  const [currentStyles, setCurrentStyles] = useState([0, 1, 2]);
  const styles = [
    'border-2 border-primary-500 bg-primary-50 text-primary-500',
    'border-2 border-primary-500 bg-primary-500 text-white',
    'border-2 border-primary-500 bg-primary-50 text-primary-500',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStyles((prev) => [prev[2], prev[0], prev[1]]);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return { styles, currentStyles };
};
