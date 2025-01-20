import Icon from "@/components/common/icon";
import KeywordList from "../keywordlist";
import UserTag from "../usertag";

interface OtherAnswerItemProps {
    id: string;
    userEmail: string;
    content: string;
    keywords?: {
        title: string;
        correct: boolean;
    }[];
    date: string;
    liked: boolean;
    likeCount: number;
    commentCount: number;
    handleLikeClick: (id: string) => void;
    onAnswerClick?: (id: string) => void;
}

const OtherAnswerItem = ({id, userEmail, content, keywords, date, liked, likeCount, commentCount, handleLikeClick, onAnswerClick}: OtherAnswerItemProps) => {
    return <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 px-4">
            <div className="flex justify-between w-full items-center">
                <UserTag userEmail={userEmail}/>
                <span className="text-xl text-stone-700">{date}</span>
            </div>
            {keywords &&  <div className="flex flex-col gap-4">
                <hr />
                <KeywordList keywords={keywords}/>
            </div>}
            <div className="flex flex-col gap-4 w-full">
                <button className="w-full text-xl text-justify" onClick={() =>onAnswerClick?.(id)} aria-label={`답변 상세 보기: ${content}`}>
                    {content}
                </button>
                <div className="flex gap-4 text-xl text-stone-600 font-medium w-full justify-end">
                    <button onClick={()=>handleLikeClick(id)} className="flex gap-2 items-center">
                        {
                            !liked ? <Icon id='heart-empty-green'/> : <Icon id='heart-green'/>
                        }
                        <span>{likeCount}</span>
                    </button>
                    <div className="flex gap-2 items-center">
                        <Icon id='comment-green'/>
                        <span>{commentCount}</span>
                    </div>
                </div>
            </div>
        </div>
        <hr className="border-stone-200"/>
    </div>
}

export default OtherAnswerItem;