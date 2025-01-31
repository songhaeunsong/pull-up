import Icon from '@/components/common/icon';
import ExamTag from '@/components/common/examTag';

interface ReviewCardProps {
  title: string;
  subtitle: string;
  tags: string[] | string;
}

const ReviewCard = ({ title, subtitle, tags }: ReviewCardProps) => {
  const renderTags = () => {
    if (typeof tags === 'string') {
      return <ExamTag title={tags} />;
    }

    return tags.map((tag, id) => <ExamTag key={id} title={tag} />);
  };

  return (
    <button className="flex min-w-[500px] flex-col gap-3 rounded-lg px-3 py-2 shadow-sm">
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col items-start">
          <span className="font-semibold text-stone-800">{title}</span>
          <span className="text-sm font-semibold text-stone-400">{subtitle}</span>
        </div>
        <Icon id="list" size={32} />
      </div>
      <div className="flex gap-2">{renderTags()}</div>
    </button>
  );
};

export default ReviewCard;
