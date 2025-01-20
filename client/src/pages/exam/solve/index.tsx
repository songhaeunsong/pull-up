import ExamProblemList from '@/components/exam/problemlist';
import InfoSection from '@/components/exam/infoSection';
import SubmitButton from '@/components/common/submitButton';

const ExamSolvePage = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center gap-20 bg-Main px-16 py-10">
      <ExamProblemList />
      <div className="flex flex-col min-w-[380px]">
        <InfoSection title="남은 시간" icon="time">
          <span>00: 24: 32</span>
        </InfoSection>
        <InfoSection title="풀이 현황" icon="problem">
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 25 }, (_, i) => (
              <button key={i} className="w-12 h-12 rounded-lg text-lg font-semibold bg-stone-100 text-stone-700">
                {i + 1}
              </button>
            ))}
          </div>
        </InfoSection>
        <SubmitButton text={'제출하기'} />
      </div>
    </div>
  );
};

export default ExamSolvePage;
