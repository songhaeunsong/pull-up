import MenuItem from "../menuitem";

interface MenuListProps {
    items: string[];
}

const MenuList = ({items}: MenuListProps) => {
    return <div className="flex flex-col w-full gap-2">
        {items.map((item, id)=>(<MenuItem key={id} title={item}/>))}
    </div>
}

export default MenuList;