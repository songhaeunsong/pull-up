interface ExamTagProps {
  title: string;
}

const examTag = ({ title }: ExamTagProps) => {
  return <div className="p-1 rounded border">{title}</div>;
};

export default examTag;
