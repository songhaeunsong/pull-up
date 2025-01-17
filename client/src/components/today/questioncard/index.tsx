import React from 'react';
import Keyword from '../keyword';

interface QuestionCardProps {
  title: string;
  keywords: { title: string; correct?: boolean }[];
  onHintClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hint: boolean;
}

const QuestionCard = ({ title, keywords, onHintClick, hint }: QuestionCardProps) => {
  return (
    <div className="relative w-full h-[372px]" style={{ perspective: '2000px' }}>
      <div
        className="relative w-full h-full transition-all duration-700 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: hint ? 'rotateY(-180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* 앞면 - 문제 */}
        <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
          <div className="flex flex-col px-6 py-4 justify-start items-center w-full h-full shadow-md rounded-xl bg-white">
            <div className="w-full flex justify-end">
              <button
                className="bg-stone-950 text-white rounded-lg py-2 px-4 text-sm font-extrabold transition-colors duration-200"
                onClick={onHintClick}
              >
                힌트 보기
              </button>
            </div>
            <div className="flex flex-1 justify-center items-center">
              <span className="text-3xl font-extrabold">{title}</span>
            </div>
          </div>
        </div>

        {/* 뒷면 - 힌트 */}
        <div
          className="absolute w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-col px-6 py-4 justify-start items-center w-full h-full shadow-md rounded-xl bg-white">
            <div className="w-full flex justify-end">
              <button
                className="bg-stone-950 text-white rounded-lg py-2 px-4 text-sm font-extrabold transition-colors duration-200"
                onClick={onHintClick}
              >
                문제 보기
              </button>
            </div>
            <div className="flex flex-1 justify-center items-center">
              <div className="flex flex-col items-center gap-8">
                <span className="text-3xl font-bold text-primary-500">키워드</span>
                <div className="flex gap-3 flex-wrap justify-center">
                  {keywords.map((keyword, index) => (
                    <Keyword key={index} title={keyword.title} color={keyword.correct ? 'purple' : 'gray'} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
