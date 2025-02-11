import SubjectSelector from '@/components/common/csConditionSelector/subjectSelector';
import { SUBJECT_OPTIONS } from '@/components/common/csConditionSelector/subjectSelector/SubjectOptions';
import { Button } from '@/components/ui/button';
import { FormFormEvent } from '@/types/event';
import { Dispatch, SetStateAction } from 'react';
import { SUBJECT_KEY } from '@/constants/game';
import { Subject } from '@/types/member';
import { SubjectSelect } from '@/types/game';

interface CreateRoomProps {
  handleGameState: (event: FormFormEvent) => void;
  selectedSubjects: SubjectSelect;
  setSelectedSubjects: Dispatch<SetStateAction<SubjectSelect>>;
}

const CreateRoom = ({ handleGameState, selectedSubjects, setSelectedSubjects }: CreateRoomProps) => {
  const isDisabled = Object.values(selectedSubjects).filter((value) => value).length < 2;

  const handleSubjectClick = (id: string) => {
    setSelectedSubjects((prev: SubjectSelect) => {
      const key = SUBJECT_KEY[id as Subject];

      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  return (
    <form onSubmit={(event: FormFormEvent) => handleGameState(event)} className="flex w-full flex-col gap-8 px-10 py-4">
      <div className="flex flex-col justify-between gap-3">
        {SUBJECT_OPTIONS.map((subject) => (
          <SubjectSelector
            key={subject.id}
            id={subject.id}
            name={subject.name}
            icon={subject.icon}
            isSelected={selectedSubjects[SUBJECT_KEY[subject.id]]}
            onClick={handleSubjectClick}
          />
        ))}
      </div>
      <div className="flex w-full flex-col gap-2">
        <span className="text-center">링크 생성 후, 친구에게 전달해주세요!</span>
        <Button type="submit" disabled={isDisabled}>
          코드 생성
        </Button>
      </div>
    </form>
  );
};

export default CreateRoom;
