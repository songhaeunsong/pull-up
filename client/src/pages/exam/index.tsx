import CsConditionSelector from '@/components/common/csConditionSelector';
import exam1 from '/assets/images/exam1.png';
import { useNavigate } from 'react-router-dom';

const ExamPage = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate('/exam/solve');
  };
  return (
    <>
      <div className="flex min-h-full w-full items-center justify-center gap-20 bg-Main py-10">
        <CsConditionSelector text={'모의고사 만들기'} onClick={onSubmit} isExam={true} />
        <img src={exam1} alt="exam1" className="w-[720px] object-contain" />
      </div>
    </>
  );
};

export default ExamPage;
