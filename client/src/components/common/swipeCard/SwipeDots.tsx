import SwipeDot from './SwipeDot';

interface SwipeDotsProps {
  current: number;
  count: number;
}

const SwipeDots = ({ current, count }: SwipeDotsProps) => {
  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: count }).map((_, index) => (
        <SwipeDot key={index} isCurrent={index + 1 === current} />
      ))}
    </div>
  );
};

export default SwipeDots;
