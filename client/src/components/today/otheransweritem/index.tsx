import Icon from '@/components/common/icon';
import KeywordList from '../keywordlist';
import SmallChip from '../../common/smallchip';

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

const OtherAnswerItem = ({
  id,
  userEmail,
  content,
  keywords,
  date,
  liked,
  likeCount,
  commentCount,
  handleLikeClick,
  onAnswerClick,
}: OtherAnswerItemProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex w-full items-center justify-between">
          <SmallChip title={userEmail} color="border-secondary-600 bg-secondary-50 text-secondary-600" />
          <span className="text-xl text-stone-700">{date}</span>
        </div>
        {keywords && (
          <div className="flex flex-col gap-4">
            <hr />
            <KeywordList keywords={keywords} />
          </div>
        )}
        <div className="flex w-full flex-col gap-4">
          <button
            className="w-full text-justify text-xl"
            onClick={() => onAnswerClick?.(id)}
            aria-label={`답변 상세 보기: ${content}`}
          >
            {content}
          </button>
          <div className="flex w-full justify-end gap-4 text-xl font-medium text-stone-600">
            <button onClick={() => handleLikeClick(id)} className="flex items-center gap-2">
              {!liked ? <Icon id="heart-empty-green" /> : <Icon id="heart-green" />}
              <span>{likeCount}</span>
            </button>
            <div className="flex items-center gap-2">
              <Icon id="comment-green" />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-stone-200" />
    </div>
  );
};

export default OtherAnswerItem;
