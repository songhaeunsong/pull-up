interface SmallChipProps {
  title: string;
  color: string;
}

const SmallChip = ({ title, color }: SmallChipProps) => {
  return <div className={`rounded-2xl border px-3 py-1 text-xs font-medium lg:px-6 lg:text-sm ${color}`}>{title}</div>;
};

export default SmallChip;
