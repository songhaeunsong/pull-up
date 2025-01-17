import Icon from '@/components/icon';

export interface SubjectSelectorProps {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  id,
  name,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className="flex items-center gap-1 justify-between cursor-pointer" 
    >
      <div className="flex text-xl font-semibold items-center gap-6">
        <Icon id={icon} size={50} />
        <span>{name}</span>
      </div>
      <Icon
        className={isSelected ? 'text-primary-500' : 'text-gray-400'}
        id={isSelected ? 'check' : 'check-empty'}
        size={30}
      />
    </div>
  );
};


export default SubjectSelector;
