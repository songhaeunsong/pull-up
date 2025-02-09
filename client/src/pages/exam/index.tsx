import { useCallback } from 'react';
import CsConditionSelector from '@/components/common/csConditionSelector';
import exam1 from '/assets/images/exam1.png';
import { useNavigate } from 'react-router-dom';
import { postExam } from '@/api/exam';
import { Subject } from '@/types/member';
import { Level } from '@/types/exam';

const ExamPage = () => {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (level: Level | null, subjects: Subject[]) => {
      try {
        const requestBody = {
          difficultyLevel: level ?? 'EASY',
          subjects: subjects,
        };
        const response = await postExam(requestBody);

        navigate(`/exam/${response.examId}`);
      } catch (error) {
        console.error('모의고사 생성 실패: ', error);
      }
    },
    [navigate],
  );

  return (
    <>
      <div className="flex h-full w-full items-center justify-around bg-Main px-16 py-10">
        <div className="mt-[94px] flex w-full items-center justify-around sm:mt-16">
          <CsConditionSelector title="시험 분야 선택" text={'모의고사 만들기'} onClick={onSubmit} isExam={true} />
          <img src={exam1} alt="exam1" className="hidden h-auto w-[400px] lg:block xl:w-[600px]" />
        </div>
      </div>
    </>
  );
};

export default ExamPage;
