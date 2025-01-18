import AnswerContainer from '../answercontainer';

interface TodayResponseProps {
  question: string;
  answer: string;
}

const TodayResponse = ({ question, answer }: TodayResponseProps) => {
  return (
    <div className="flex flex-col items-center flex-1 w-full border p-9 gap-9 rounded-2xl border-primary-200">
      <div className="w-full text-2xl font-semibold">오늘의 문제</div>
      <div className="w-full text-xl font-medium text-center border p-9 rounded-2xl border-secondary-500 bg-secondary-50">
        {question}
      </div>
      <AnswerContainer title="나의 답변" content={answer} />
    </div>
  );
};

export default TodayResponse;
