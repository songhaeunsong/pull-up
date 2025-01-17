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
        <Icon id="menu" />
      </div>
      <div className="flex gap-2 items-center">
        <img src={image} width={80} height={80} className="rounded-full object-cover" />
        <div className="flex flex-col">
          <span>{name}</span>
          <span>{email}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span>관심 과목</span>
        {subjects.map((subject, id) => (
          <SubjectTag key={id} title={subject} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
