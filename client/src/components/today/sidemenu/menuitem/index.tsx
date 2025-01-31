interface MenuItemProps {
  title: string;
}

const MenuItem = ({ title }: MenuItemProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <button className="overflow-hidden truncate whitespace-nowrap px-1 text-left text-lg text-gray-700">
        {title}
      </button>
      <hr className="border border-gray-200" />
    </div>
  );
};

export default MenuItem;
