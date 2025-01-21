interface SmallChipProps {
  title: string;
  color: string;
}

const SmallChip = ({ title, color }: SmallChipProps) => {
  return <div className={`rounded-2xl border px-6 py-1 text-sm font-medium ${color}`}>{title}</div>;
};

export default SmallChip;
