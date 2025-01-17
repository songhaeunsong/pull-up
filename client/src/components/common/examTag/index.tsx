interface ExamTagProps {
  title: string;
}

const ExamTag = ({ title }: ExamTagProps) => {
  return (
    <div className="py-1 px-2 rounded border border-primary-400 bg-primary-50 text-primary-400 font-semibold text-xs">
      {title}
    </div>
  );
};

export default ExamTag;
