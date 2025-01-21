import React from 'react';
import Keyword from '../keywordlist/keyword';

interface QuestionCardProps {
  title: string;
  keywords: { title: string; correct?: boolean }[];
  onHintClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hint: boolean;
}

const QuestionCard = ({ title, keywords, onHintClick, hint }: QuestionCardProps) => {
  return (
    <div className="relative h-[372px] w-full" style={{ perspective: '2000px' }}>
      <div
        className="relative h-full w-full transition-all duration-700 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: hint ? 'rotateY(-180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* 앞면 - 문제 */}
        <div className="absolute h-full w-full" style={{ backfaceVisibility: 'hidden' }}>
          <div className="flex h-full w-full flex-col items-center justify-start rounded-xl bg-white px-6 py-4 shadow-md">
            <div className="flex w-full justify-end">
              <button
                className="rounded-lg bg-stone-950 px-4 py-2 text-sm font-extrabold text-white transition-colors duration-200"
                onClick={onHintClick}
              >
                힌트 보기
              </button>
            </div>
            <div className="flex flex-1 items-center">
              <span className="text-3xl font-extrabold">{title}</span>
            </div>
            <div className="h-9"></div>
          </div>
        </div>

        {/* 뒷면 - 힌트 */}
        <div
          className="absolute h-full w-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex h-full w-full flex-col items-center justify-start rounded-xl bg-white px-6 py-4 shadow-md">
            <div className="flex w-full justify-end">
              <button
                className="rounded-lg bg-stone-950 px-4 py-2 text-sm font-extrabold text-white transition-colors duration-200"
                onClick={onHintClick}
              >
                문제 보기
              </button>
            </div>
            <div className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-8">
                <span className="text-3xl font-bold text-primary-500">키워드</span>
                <div className="flex flex-wrap justify-center gap-3">
                  {keywords.map((keyword, index) => (
                    <Keyword key={index} title={keyword.title} color={keyword.correct ? 'purple' : 'gray'} />
                  ))}
                </div>
              </div>
            </div>
            <div className="h-9"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
