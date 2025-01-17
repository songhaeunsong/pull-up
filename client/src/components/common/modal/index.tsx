import { useState } from 'react';
import SubmitButton from '../submitButton';
import Icon from '@/components/icon';
import LevelSelecor from './levelSelecor';
import SubjectSelector from './subjectSelector';

interface ModalProps {
  isModal?: boolean;
  isModalOpen?: boolean;
  isExam?: boolean;
  text: string;
}

const Modal = ({ isModal = false, isExam = true, text }: ModalProps) => {
  const LEVELS_OPTIONS = [
    { id: '1', name: '상' },
    { id: '2', name: '중' },
    { id: '3', name: '하' },
  ];

  const SUBJECT_OPTIONS = [
    { id: '1', name: '컴퓨터구조', icon: 'computerstructure' },
    { id: '2', name: '운영체제', icon: 'os' },
    { id: '3', name: '네트워크', icon: 'network' },
    { id: '4', name: '데이터베이스', icon: 'database' },
    { id: '5', name: '알고리즘', icon: 'algorithm' },
    { id: '6', name: '자료구조', icon: 'datastructure' },
  ];

  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);

  const handleLevelClick = (id: string) => {
    setSelectedLevelId(id);
  };

  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const handleSubjectClick = (id: string) => {
    setSelectedSubjectIds((prev) => (prev.includes(id) ? prev.filter((subjectId) => subjectId !== id) : [...prev, id]));
  };

  return (
    <>
      <div className="bg-white shadow-md w-[532px] min-w-[532px] h-auto rounded-2xl py-8 px-6 flex flex-col gap-2">
        <div className="flex flex-col px-2">
          {isModal && (
            <div className="flex justify-end">
              <Icon className="cursor-pointer" id="close" size={36} />
            </div>
          )}
          <div className="flex flex-col gap-6 px-2">
            <div className="flex flex-col gap-4">
              <div className="text-xl text-stone-700 font-semibold">시험 분야 선택</div>
              <div className="flex flex-col gap-4 justify-center">
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
              <div className="flex flex-col gap-4 pt-4">
                <div className="text-xl text-stone-700 font-semibold">난이도 선택</div>
                <div>
                  <div className="flex gap-2 justify-center">
                    {LEVELS_OPTIONS.map((level) => (
                      <LevelSelecor
                        key={level.id}
                        id={level.id}
                        name={level.name}
                        isSelected={selectedLevelId === level.id}
                        onClick={handleLevelClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col items-center gap-3 text-primary-500">
              {isModal && <span>링크를 생성하고 친구에게 전달해주세요!</span>}
              <SubmitButton text={text} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
