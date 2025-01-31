import AnswerContainer from '../answercontainer';
import KeywordList from '../keywordlist';

interface TodayFeedbackProps {
  rate: string;
  keywords: string[];
  strength: string;
  weakness: string;
  modelanswer: string;
}

const TodayFeedback = ({ rate, keywords, strength, weakness, modelanswer }: TodayFeedbackProps) => {
  return (
    <div className="flex h-full w-full flex-col items-start gap-6 rounded-2xl border border-primary-200 bg-white p-9">
      <div className="flex w-full justify-between">
        <span className="text-3xl font-semibold text-primary-500">{rate}</span>
        <KeywordList keywords={keywords} color="purple" />
      </div>

      <AnswerContainer title="강점" content={strength} />
      <AnswerContainer title="개선점" content={weakness} />
      <AnswerContainer title="모범답안" content={modelanswer} />
    </div>
  );
};

export default TodayFeedback;
