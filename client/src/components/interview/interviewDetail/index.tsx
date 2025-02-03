import ContentSection from '../contentSection';

interface InterviewDetailProps {
  title: string;
  content: string;
}

const InterviewDetail = ({ title, content }: InterviewDetailProps) => {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-6 rounded-2xl md:gap-9 md:border md:border-primary-200 md:bg-white md:p-9">
      <div className="w-full text-xl font-semibold md:text-2xl">오늘의 문제</div>
      <div className="w-full rounded-2xl border border-secondary-500 bg-secondary-50 p-6 text-center text-lg font-medium md:p-9 md:text-xl">
        {title}
      </div>
      <ContentSection title="나의 답변" content={content} />
    </div>
  );
};

export default InterviewDetail;
