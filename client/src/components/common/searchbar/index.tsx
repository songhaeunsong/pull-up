import Icon from "../icon"

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>)=>void;
}

const SearchBar = ({value, onChange, onKeyDown}: SearchBarProps) => {

    return <div className="flex w-full px-4 py-3 border rounded-lg border-primary-200">
        <div className="flex items-center w-full gap-3">
            <Icon id="search" size={16}/>
            <input id="search" placeholder="검색어를 입력하세요" value={value} onChange={onChange} onKeyDown={onKeyDown} className="w-full text-base outline-none placeholder:text-stone-600"/>
        </div>
    </div>
}

export default SearchBar;