import Icon from '@/components/common/icon';
import InterviewDetail from '../interviewDetail';
interface InterviewMyAnswerProps {
  question: string;
  answer: string;
  onButtonClick: () => void;
}

const InterviewMyAnswer = ({ question, answer, onButtonClick }: InterviewMyAnswerProps) => {
  return (
    <div className="flex h-fit flex-col gap-6">
      <InterviewDetail title={question} content={answer} />
      <div className="flex w-full justify-end">
        <button
          className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 md:px-5 md:py-3"
          onClick={onButtonClick}
        >
          <span className="text-lg font-semibold text-white md:text-xl">다른 사람의 답변</span>
          <Icon id="move" size={16} className="h-auto md:w-5" />
        </button>
      </div>
    </div>
  );
};

export default InterviewMyAnswer;
