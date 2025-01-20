import Icon from '@/components/common/icon';

interface InfoSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const InfoSection = ({ title, icon, children }: InfoSectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Icon id={icon} size={28} />
        <span className="font-semibold text-2xl text-stone-900">{title}</span>
      </div>
      <div className="bg-white py-10 rounded-xl border border-primary-200 flex justify-center items-center text-4xl font-semibold">
        {children}
      </div>
    </div>
  );
};

export default InfoSection;
