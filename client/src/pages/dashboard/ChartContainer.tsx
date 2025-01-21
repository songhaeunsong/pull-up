import Icon from '@/components/common/icon';
import { ReactNode } from 'react';

interface Tprops {
  icon: string;
  title: string;
  children: ReactNode;
}

const ChartContainer = ({ icon, title, children }: Tprops) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center gap-3">
        <Icon id={icon} size={25} aria-label={title} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
};

export default ChartContainer;
