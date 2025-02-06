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
          <Icon id={icon} size={20} className="h-auto md:w-6 lg:w-7" />
          <span className="text-lg font-semibold text-stone-900 md:text-xl lg:text-2xl">{title}</span>
        </div>
      )}
      <div className="flex items-center justify-center rounded-xl border border-primary-200 bg-white py-8 text-2xl font-semibold md:text-3xl lg:text-4xl">
        {children}
      </div>
    </div>
  );
};

export default InfoSection;
