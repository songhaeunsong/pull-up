import SubjectSelector from '@/components/common/csConditionSelector/subjectSelector';
import { SUBJECT_OPTIONS } from '@/components/common/csConditionSelector/subjectSelector/SubjectOptions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProfileModalProps {
  handleSubject: () => void;
}

const ProfileModal = ({ handleSubject }: ProfileModalProps) => {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const isDisabled = selectedSubjectIds.length === 0;

  const handleSubjectClick = (id: string) => {
    setSelectedSubjectIds((prev) => (prev.includes(id) ? prev.filter((subjectId) => subjectId !== id) : [...prev, id]));
    console.log('selectedSubjectIds', selectedSubjectIds);
  };
  return (
    <div className="flex w-full flex-col gap-8 px-10 py-4">
      <div className="flex flex-col justify-between gap-3">
        {SUBJECT_OPTIONS.map((subject) => (
          <SubjectSelector
            key={subject.id}
            id={subject.id}
            name={subject.name}
            icon={subject.icon}
            isSelected={selectedSubjectIds.includes(subject.id)}
            onClick={handleSubjectClick}
          />
        ))}
      </div>
      <Button disabled={isDisabled} onClick={handleSubject}>
        수정 완료
      </Button>
    </div>
  );
};

export default ProfileModal;
