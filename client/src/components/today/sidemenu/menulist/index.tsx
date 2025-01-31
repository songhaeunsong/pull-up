import { InterviewListResponse } from '@/types/interview';
import MenuItem from '../menuitem';

interface MenuListProps {
  items: InterviewListResponse;
}

const MenuList = ({ items }: MenuListProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {items.map((item, id) => (
        <MenuItem key={id} title={item.question} />
      ))}
    </div>
  );
};

export default MenuList;
