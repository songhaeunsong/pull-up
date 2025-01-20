import ExamProblemList from '@/components/exam/problemlist';

const ExamSolvePage = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center gap-20 bg-Main px-16 py-10">
      <ExamProblemList />
      <h1>ExamSolvePage</h1>
    </div>
  );
};

export default ExamSolvePage;
