import Icon from "@/components/common/icon";
import MenuList from "./menulist";

interface SideMenuProps {
    isOpen: boolean;
    onMenuClick: (e: React.MouseEvent<HTMLButtonElement>)=>void;
}

const SideMenu = ({ isOpen, onMenuClick }:SideMenuProps ) => {
    const onSearchClick = () => {
        console.log('오늘의 질문 검색')
    }
    
    // 더미데이터
    const dummyData = [
        'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
        'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
        'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
        'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
        'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
        'OOP의 5가지 설계 원칧 (SOLID)이란 무엇인가요?',
    ];

    return (
        <div 
            className={`fixed top-0 left-0 h-full bg-white border-r border-primary-200 transition-transform duration-300 ease-in-out z-30 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="flex flex-col gap-9 px-6 py-10 w-[350px] h-full">
                <div className="flex justify-between">
                    <button onClick={onMenuClick}>
                        <Icon id='menu'/>
                    </button>
                    <button onClick={onSearchClick}>
                        <Icon id='search'/>
                    </button>
                </div>
                <MenuList items={dummyData}/>
            </div>
        </div>
    );
};

export default SideMenu;