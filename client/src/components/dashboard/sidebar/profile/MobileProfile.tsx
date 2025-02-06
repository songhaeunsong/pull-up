import Icon from '@/components/common/icon';
import SubjectTag from '@/components/common/subjectTag';

interface MobileProfileProps {
  image: string;
  name: string;
  email: string;
  subjects: string[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MobileProfile = ({ image, name, email, subjects, onClick }: MobileProfileProps) => {
  return (
    <div className="flex flex-row justify-between gap-3 rounded-2xl bg-white p-5 shadow-sm">
      <div className="grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-6">
        <img src={image} width={80} height={80} className="rounded-full object-cover" />
        <div className="flex flex-col justify-center">
          <span className="text-xl font-bold">{name}</span>
          <span className="text-sm font-semibold text-stone-700">{email}</span>
        </div>
        <span className="text-right text-sm font-semibold text-stone-700">관심 과목</span>
        <div>
          <div className="flex flex-wrap gap-1">
            {subjects.map((subject, id) => (
              <SubjectTag key={id} title={subject} />
            ))}
          </div>
        </div>
      </div>
      <button className="mt-1 flex justify-end" onClick={onClick}>
        <Icon id="about" />
      </button>
    </div>
  );
};

export default MobileProfile;
