import SubjectTag from '@/components/common/subjectTag';
import Icon from '@/components/common/icon';
import useResponsive from '@/hooks/useResponsive';
import React from 'react';

interface ProfileProps {
  image: string;
  name: string;
  email: string;
  subjects: string[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Profile = ({ image, name, email, subjects, onClick }: ProfileProps) => {
  const { isDesktop } = useResponsive();
  return (
    <div className="flex flex-row-reverse lg:block">
      <button onClick={onClick} className="mt-1 flex justify-end lg:mt-0 lg:w-full">
        <Icon id="about" />
      </button>
      <div className="flex w-[150px] flex-col justify-evenly gap-3 lg:w-auto lg:justify-start">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {isDesktop && <img src={image} width={80} height={80} className="rounded-full object-cover" />}
          <div className="flex flex-col">
            <span className="text-xl font-bold lg:text-2xl">{name}</span>
            <span className="text-sm font-semibold text-stone-700 lg:text-base">{email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <span className="w-20 text-sm font-semibold text-stone-700 lg:text-center lg:text-base">관심 과목</span>
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
