import CsConditionSelector from '@/components/common/csConditionSelector';
import exam1 from '/assets/images/exam1.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ExamPage = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const onSubmit = () => {
    navigate('/exam/solve');
  };
  return (
    <>
      <div className="mt-16 flex h-full w-full items-center justify-around bg-Main py-10">
        <CsConditionSelector text={'모의고사 만들기'} onClick={onSubmit} isExam={true} />
        <img src={exam1} alt="exam1" className="h-auto w-[600px]" />
      </div>
    </>
  );
};

export default ExamPage;
