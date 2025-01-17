import AnswerContainer from '../answercontainer';
import Keyword from '../keyword';

interface TodayFeedbackProps {
  rate: string;
  keywords: {
    title: string;
    correct: boolean;
  }[];
  strength: string;
  weakenss: string;
  modelanswer: string;
}

const TodayFeedback = ({ rate, keywords, strength, weakenss, modelanswer }: TodayFeedbackProps) => {
  return (
    <div className="flex flex-col gap-6 p-9 w-full h-full items-start rounded-2xl border border-x-primary-200">
      <div className="flex justify-between w-full">
        <span className="text-3xl text-primary-500 font-semibold">{rate}</span>
        <div className="flex gap-2">
          <button
            disabled
            className="border border-b-2 py-2 px-3 rounded-lg border-primary-200 bg-primary-50 text-primary-500 font-semibold text-base"
          >
            키워드
          </button>
          {keywords.map((keyword) => (
            <Keyword title={keyword.title} color={keyword.correct ? 'purple' : 'gray'} />
          ))}
        </div>
      </div>

      <AnswerContainer title="강점" content={strength} />
      <AnswerContainer title="개선점" content={weakenss} />
      <AnswerContainer title="모범답안" content={modelanswer} />
    </div>
  );
};

export default TodayFeedback;
