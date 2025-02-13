import { CSSProperties } from 'react';

interface SmallChipProps {
  title: string;
  color: string;
  style?: CSSProperties;
}

const SmallChip = ({ title, color, style }: SmallChipProps) => {
  return (
    <div className={`rounded-2xl border px-3 py-1 text-xs font-medium lg:px-6 lg:text-sm ${color}`} style={style}>
      {title}
    </div>
  );
};

export default SmallChip;
