import AnswerContainer from '../answercontainer';

interface TodayResponseProps {
    data: {
        question: string;
        answer: string;
    }
}

const TodayResponse = ({data}: TodayResponseProps) => {
  return <div className='flex flex-col items-center w-full p-9 gap-9 rounded-2xl'>
    <div className='w-full font-semibold text-2xl'>오늘의 문제</div>
    <div className='w-full p-9 rounded-2xl border border-secondary-500 bg-secondary-50 text-center text-xl font-medium'>{data.question}</div>
    <AnswerContainer title='나의 답변' content={data.answer}/>
  </div>;
};

export default TodayResponse;