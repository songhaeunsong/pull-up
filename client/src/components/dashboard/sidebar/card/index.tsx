import ExamTag from '@/components/common/examTag';
import Icon from '@/components/icon';
import { Link } from 'react-router-dom';

interface CardProps {
  link: string;
  title: string;
  data: { content: string; date?: string; subjects: string[] };
}

const Card = ({ link, title, data }: CardProps) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <nav>
        <div className="flex justify-between">
          <span className="font-bold text-lg text-stone-900">{title}</span>
          <Link to={link}>
            <Icon id="show" size={30} aria-label={`${title}로 이동`} />
          </Link>
        </div>
      </nav>

      <button className="flex flex-col w-full py-4 px-3 gap-2 shadow-sm rounded-2xl">
        <div className="flex w-full justify-between">
          <span className="text-left text-base text-stone-800 font-medium">{data.content}</span>
          <span className="text-base text-stone-400">{data.date}</span>
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
