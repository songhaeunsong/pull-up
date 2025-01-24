import { useState } from 'react';
import SubmitButton from '../submitButton';
import { SUBJECT_OPTIONS } from './subjectSelector/SubjectOptions';
import { LEVELS_OPTIONS } from './levelSelector/levelOptions';
import SubjectSelector from './subjectSelector';
import LevelSelector from './levelSelector';

interface CsConditionSelectorProps {
  isExam?: boolean;
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CsConditionSelector = ({ isExam = false, text, onClick }: CsConditionSelectorProps) => {
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  const handleLevelClick = (id: string) => {
    setSelectedLevelId(id);
  };

  const handleSubjectClick = (id: string) => {
    setSelectedSubjectIds((prev) => (prev.includes(id) ? prev.filter((subjectId) => subjectId !== id) : [...prev, id]));
  };

  const isDisabled = selectedSubjectIds.length === 0 || (isExam && !selectedLevelId);

  return (
    <div className="flex h-auto w-[450px] min-w-[450px] flex-col gap-2 rounded-2xl bg-white p-8 shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold text-stone-700">시험 분야 선택</div>
          <div className="flex flex-col justify-center gap-2">
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
        </div>
        {isExam && (
          <div className="flex flex-col gap-2 pt-4">
            <div className="text-lg font-semibold text-stone-700">난이도 선택</div>
            <div className="flex justify-center gap-2">
              {LEVELS_OPTIONS.map((level) => (
                <LevelSelector
                  key={level.id}
                  id={level.id}
                  name={level.name}
                  isSelected={selectedLevelId === level.id}
                  onClick={handleLevelClick}
                />
              ))}
            </div>
          </div>
        )}
        <SubmitButton text={text} onClick={onClick} disabled={isDisabled} color={isDisabled ? 'gray' : 'primary'} />
      </div>
    </div>
  );
};

export default CsConditionSelector;
