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
        <div className="text-lg font-bold text-stone-900 md:text-xl lg:text-2xl">해설</div>
        <button
          className="rounded-lg bg-stone-950 px-4 py-2 text-sm font-semibold text-white lg:text-base"
          onClick={toggleFold}
        >
          {isFolded ? '접어두기' : '펼치기'}
        </button>
      </div>
      {/* Answer & Solution */}
      {isFolded && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="inline-flex whitespace-nowrap rounded-lg border border-primary-500 bg-primary-50 px-2 py-1 text-primary-500 md:px-3">
                정답
              </div>
              <span className="text-lg font-bold text-primary-500 lg:text-xl">{answer}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1 whitespace-nowrap font-semibold text-secondary-600 md:text-lg">
              정답률 <div className="text-lg md:text-2xl lg:text-2xl">{correctRate}%</div>
            </div>
          </div>
          <span className="md:text-lg lg:text-xl">{explanation}</span>
        </div>
      )}
    </div>
  );
};

export default ExamSolution;
