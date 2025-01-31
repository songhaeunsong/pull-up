import SubjectSelector from '@/components/common/csConditionSelector/subjectSelector';
import { SUBJECT_OPTIONS } from '@/components/common/csConditionSelector/subjectSelector/SubjectOptions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CreateRoomProps {
  handleGameState: () => void;
}

const CreateRoom = ({ handleGameState }: CreateRoomProps) => {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const isDisabled = selectedSubjectIds.length === 0;

  const handleSubjectClick = (id: string) => {
    setSelectedSubjectIds((prev) => (prev.includes(id) ? prev.filter((subjectId) => subjectId !== id) : [...prev, id]));
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
      <div className="flex w-full flex-col gap-2">
        <span className="text-center">링크를 생성하고 친구에게 전달해주세요!</span>
        <Button disabled={isDisabled} onClick={handleGameState}>
          코드 생성
        </Button>
      </div>
    </div>
  );
};

export default CreateRoom;
