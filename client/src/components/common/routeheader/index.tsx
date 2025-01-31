import Icon from "../icon";

interface RouteHeaderProps {
    prev: string;
    title: string;
    onBackClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RouteHeader = ({prev, title, onBackClick}:RouteHeaderProps) => {
    return <div className="flex flex-col gap-1">
        <button className="flex gap-2 items-center" onClick={onBackClick} aria-label={`${prev}으로 가기`}>
            <Icon id='back' size={16}/>
            <span className="text-lg font-semibold text-stone-700">{prev}</span>
        </button>
        <div className="text-2xl font-semibold">{title}</div>
    </div>
}

export default RouteHeader;