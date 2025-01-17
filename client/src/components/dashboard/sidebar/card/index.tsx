import SubjectTag from '@/components/common/subjectTag';
import Icon from '@/components/icon';

interface CardProps {
  title: string;
  data: { content: string; date?: string; subjects: string[] };
}

const Card = ({ title, data }: CardProps) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <button className="flex justify-between">
        <span className="font-bold">{title}</span>
        <Icon id="show" size={30} />
      </button>

      <button className="flex flex-col w-full py-4 px-3 gap-2 border shadow-sm rounded-2xl">
        <div className="flex w-full justify-between">
          <span className="text-left">{data.content}</span>
          <span>{data.date}</span>
        </div>
        <div className="flex gap-2">
          {data.subjects.map((subject, id) => (
            <SubjectTag key={id} title={subject} />
          ))}
        </div>
      </button>
    </div>
  );
};

export default Card;
