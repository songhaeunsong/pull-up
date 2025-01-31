import { useState } from 'react';

interface ExamSolutionProps {
  answer: string;
  correctRate: number;
  explanation: string;
}

const ExamSolution = ({ answer, correctRate, explanation }: ExamSolutionProps) => {
  const [isFolded, setIsFolded] = useState(false);

  const toggleFold = () => {
    setIsFolded((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-primary-200 bg-white px-7 py-7">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-stone-900">해설</div>
        <button className="w-[90px] rounded-lg bg-stone-950 px-4 py-2 font-semibold text-white" onClick={toggleFold}>
          {isFolded ? '접어두기' : '펼치기'}
        </button>
      </div>
      {/* Answer & Solution */}
      {isFolded && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg border border-primary-500 bg-primary-50 px-3 py-1 text-primary-500">정답</div>
              <span className="text-xl font-bold text-primary-500">{answer}</span>
            </div>
            <div className="text-lg font-semibold text-secondary-600">
              정답률 <span className="text-2xl">{correctRate}%</span>
            </div>
          </div>
          <span className="text-xl">{explanation}</span>
        </div>
      )}
    </div>
  );
};

export default ExamSolution;
