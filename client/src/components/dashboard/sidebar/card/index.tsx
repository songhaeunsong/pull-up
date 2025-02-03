import ExamTag from '@/components/common/examTag';
import Icon from '@/components/common/icon';
import { Link } from 'react-router-dom';

interface CardProps {
  link: string;
  title: string;
  data: { content: string; date?: string; subjects: string[] };
}

const Card = ({ link, title, data }: CardProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <nav>
        <div className="flex items-center justify-between">
          <span className="text-md font-bold text-stone-900 lg:text-lg">{title}</span>
          <Link to={link}>
            <Icon id="list" size={30} aria-label={`${title}로 이동`} />
          </Link>
        </div>
      </nav>

      <button className="flex w-full flex-col gap-2 rounded-2xl px-3 py-4 shadow-sm">
        <div className="flex h-[45px] w-full justify-between lg:h-auto">
          <span className="text-left text-xs font-medium text-stone-800 lg:text-base">{data.content}</span>
          <span className="text-xs text-stone-400 lg:text-base">{data.date}</span>
        </div>
        <div className="flex gap-2">
          {data.subjects.map((subject, id) => (
            <ExamTag key={id} title={subject} />
          ))}
        </div>
      </button>
    </div>
  );
};

export default Card;
