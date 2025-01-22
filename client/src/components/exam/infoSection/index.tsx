import Icon from '@/components/common/icon';

interface InfoSectionProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
}

const InfoSection = ({ title, icon, children }: InfoSectionProps) => {
  return (
    <div className="flex flex-col justify-center gap-3">
      {icon && title && (
        <div className="flex items-center gap-2">
          <Icon id={icon} size={28} />
          <span className="text-2xl font-semibold text-stone-900">{title}</span>
        </div>
      )}
      <div className="flex items-center justify-center rounded-xl border border-primary-200 bg-white py-8 text-4xl font-semibold">
        {children}
      </div>
    </div>
  );
};

export default InfoSection;
