interface MenuItemProps {
    title: string;
}

const MenuItem = ({title}: MenuItemProps) => {
    return <div className="flex flex-col w-full gap-2">
        <button className="px-1 overflow-hidden text-lg text-left text-gray-700 truncate whitespace-nowrap">{title}</button>
        <hr className="border border-gray-200"/>
    </div>
}

export default MenuItem;