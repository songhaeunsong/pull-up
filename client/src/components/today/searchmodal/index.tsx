import Icon from "@/components/common/icon";
import SearchBar from "@/components/common/searchbar"
import { useState } from "react"
import MenuList from "../sidemenu/menulist";

interface SearchModalProps {
    onClose: () => void;
}

const SearchModal = ({onClose}: SearchModalProps) => {
    const [value, setValue] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
        setValue(e.target.value);
    }

    // 더미데이터
    const dummyData = [
        'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
        'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
        'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
        'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
        'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
    ];

    return <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-[200px] z-40">
        <div className="flex flex-col gap-6 p-8 w-[600px] h-[400px] shadow-md bg-white rounded-3xl">
            <div className="flex flex-none w-full gap-6">
                <SearchBar value={value} onChange={onChange}/>
                <button onClick={onClose}>
                    <Icon id="close" size={30}/>
                </button>
            </div>
            <div className="flex flex-col flex-1 w-full min-h-0 gap-3">
                <div className="flex-none text-lg font-semibold">오늘의 질문</div>
                <div className="flex-1 overflow-y-auto">
                    <MenuList items={dummyData}/>
                </div>
            </div>
        </div>
    </div>
}

export default SearchModal