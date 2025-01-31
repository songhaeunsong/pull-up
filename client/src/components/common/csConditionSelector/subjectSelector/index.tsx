import Icon from '@/components/common/icon';
import { Subject } from '@/types/member';

export interface SubjectSelectorProps {
  id: Subject;
  name: string;
  icon: string;
  isSelected: boolean;
  onClick: (id: Subject) => void;
}

const SubjectSelector = ({ id, name, icon, isSelected, onClick }: SubjectSelectorProps) => {
  return (
    <div onClick={() => onClick(id)} className="flex cursor-pointer items-center justify-between gap-1">
      <div className="flex items-center gap-6 text-lg font-semibold">
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
