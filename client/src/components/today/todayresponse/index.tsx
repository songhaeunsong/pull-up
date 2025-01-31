import AnswerContainer from '../answercontainer';

interface TodayResponseProps {
  question: string;
  answer: string;
}

const TodayResponse = ({ question, answer }: TodayResponseProps) => {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-9 rounded-2xl border border-primary-200 bg-white p-9">
      <div className="w-full text-2xl font-semibold">오늘의 문제</div>
      <div className="w-full rounded-2xl border border-secondary-500 bg-secondary-50 p-9 text-center text-xl font-medium">
        {question}
      </div>
      <AnswerContainer title="나의 답변" content={answer} />
    </div>
  );
};

export default TodayResponse;
