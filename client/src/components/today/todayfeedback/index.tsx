import AnswerContainer from '../answercontainer';
import Keyword from '../keyword';

interface TodayFeedbackProps {
  rate: string;
  keywords: {
    title: string;
    correct: boolean;
  }[];
  strength: string;
  weakness: string;
  modelanswer: string;
}

const TodayFeedback = ({ rate, keywords, strength, weakness, modelanswer }: TodayFeedbackProps) => {
  return (
    <div className="flex flex-col items-start w-full gap-6 border p-9 rounded-2xl border-primary-200">
      <div className="flex justify-between w-full">
        <span className="text-3xl font-semibold text-primary-500">{rate}</span>
        <div className="flex gap-2">
          <button
            disabled
            className="px-3 py-2 text-base font-semibold border-2 rounded-lg border-primary-200 bg-primary-50 text-primary-500"
          >
            키워드
          </button>
          {keywords.map((keyword, id) => (
            <Keyword key={id} title={keyword.title} color={keyword.correct ? 'purple' : 'gray'} />
          ))}
        </div>
      </div>

      <AnswerContainer title="강점" content={strength} />
      <AnswerContainer title="개선점" content={weakness} />
      <AnswerContainer title="모범답안" content={modelanswer} />
    </div>
  );
};

export default TodayFeedback;
