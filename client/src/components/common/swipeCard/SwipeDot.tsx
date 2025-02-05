import { cn } from '@/lib/utils';

const SwipeDot = ({ isCurrent }: { isCurrent: boolean }) => {
  return (
    <div
      className={cn({ 'bg-stone-900': isCurrent, 'bg-stone-600': !isCurrent }, 'h-[5.5px] w-[5.5px] rounded-full')}
    ></div>
  );
};
export default SwipeDot;
