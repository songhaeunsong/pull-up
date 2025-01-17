import Modal from '@/components/common/Modal';
import exam1 from '/assets/images/exam1.png';

const ExamPage = () => {
  return (
    <>
      <div className="bg-Main flex w-full flex-1 py-10 gap-20 justify-center items-center">
        <Modal text={'모의고사 만들기'}/>
        <img src={exam1} alt="exam1" className="w-[720px] object-contain" />
      </div>
    </>
  );
};

export default ExamPage;
