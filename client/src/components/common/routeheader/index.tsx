import Icon from "../icon";

interface RouteHeaderProps {
    title: string;
    onBackClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RouteHeader = ({title, onBackClick}:RouteHeaderProps) => {
    return <div className="flex gap-4 items-center">
        <button onClick={onBackClick} aria-label="뒤로 가기"><Icon id='back'/></button>
        <span className="text-2xl font-semibold">{title}</span>
    </div>
}

export default RouteHeader;