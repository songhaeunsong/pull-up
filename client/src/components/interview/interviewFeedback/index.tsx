import AnswerContainer from '../contentSection';
import KeywordList from '../keywordList';

interface InterviewFeedbackProps {
  grade: string;
  keywords: string[];
  strength: string;
  weakness: string;
  answer: string;
}

const InterviewFeedback = ({ grade, keywords, strength, weakness, answer }: InterviewFeedbackProps) => {
  return (
    <div className="flex h-full w-full flex-col items-start gap-6 rounded-2xl border border-primary-200 bg-white p-9">
      <div className="flex w-full justify-between">
        <span className="text-3xl font-semibold text-primary-500">{grade}</span>
        <KeywordList keywords={keywords} color="purple" />
      </div>

      <AnswerContainer title="강점" content={strength} />
      <AnswerContainer title="개선점" content={weakness} />
      <AnswerContainer title="모범답안" content={answer} />
    </div>
  );
};

export default InterviewFeedback;
