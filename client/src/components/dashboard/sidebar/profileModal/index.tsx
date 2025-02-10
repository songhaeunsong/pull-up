import { updateInterestSubjects } from '@/api/member';
import SubjectSelector from '@/components/common/csConditionSelector/subjectSelector';
import { SUBJECT_OPTIONS } from '@/components/common/csConditionSelector/subjectSelector/SubjectOptions';
import { Button } from '@/components/ui/button';
import { Subject } from '@/types/member';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileModal = ({ onClose }: ProfileModalProps) => {
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const isDisabled = selectedSubjects.length === 0;

  const handleSubjectClick = (id: Subject) => {
    setSelectedSubjects((prev) => (prev.includes(id) ? prev.filter((subjectId) => subjectId !== id) : [...prev, id]));
  };

  const onSubmit = async (subjects: Subject[]) => {
    const status = await updateInterestSubjects(subjects);
    onClose();
    if (status === 200) {
      toast.success('관심심 과목이 수정되었습니다.', { position: 'bottom-center' });
    } else {
      toast.error('관심 과목 수정에 실패했습니다.', { position: 'bottom-center' });
    }
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
            isSelected={selectedSubjects.includes(subject.id)}
            onClick={handleSubjectClick}
          />
        ))}
      </div>
      <Button disabled={isDisabled} onClick={() => onSubmit(selectedSubjects)}>
        수정 완료
      </Button>
    </div>
  );
};

export default ProfileModal;
