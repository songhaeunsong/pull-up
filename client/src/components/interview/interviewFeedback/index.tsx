import AnswerContainer from '../contentSection';
import KeywordList from '../keywordList';

interface InterviewFeedbackProps {
  keywords: string[];
  strength: string;
  weakness: string;
  answer: string;
}

const InterviewFeedback = ({ keywords, strength, weakness, answer }: InterviewFeedbackProps) => {
  return (
    <div className="flex h-full w-full flex-col items-start gap-6 rounded-2xl md:border md:border-primary-200 md:bg-white md:p-9">
      <div className="flex w-full justify-end">
        <KeywordList keywords={keywords} color="purple" />
      </div>

      <AnswerContainer title="강점" content={strength} />
      <AnswerContainer title="개선점" content={weakness} />
      <AnswerContainer title="모범답안" content={answer} />
    </div>
  );
};

export default InterviewFeedback;
