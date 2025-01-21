import MenuItem from '../menuitem';

interface MenuListProps {
  items: string[];
}

const MenuList = ({ items }: MenuListProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {items.map((item, id) => (
        <MenuItem key={id} title={item} />
      ))}
    </div>
  );
};

export default MenuList;
