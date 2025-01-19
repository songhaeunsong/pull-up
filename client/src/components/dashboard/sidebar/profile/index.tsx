import SubjectTag from '@/components/common/subjectTag';
import Icon from '@/components/icon';

interface ProfileProps {
  image: string;
  name: string;
  email: string;
  subjects: string[];
}

const Profile = ({ image, name, email, subjects }: ProfileProps) => {
  return (
    <div>
      <div className="flex w-full justify-end">
        <Icon id="about" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <img src={image} width={80} height={80} className="rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{name}</span>
            <span className="text-base font-semibold text-stone-700">{email}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20 text-center text-base font-semibold text-stone-700">관심 과목</span>
          <div className="flex flex-1 flex-wrap gap-1">
            {subjects.map((subject, id) => (
              <SubjectTag key={id} title={subject} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
