interface SubjectTagProps {
  title: string;
}

const SubjectTag = ({ title }: SubjectTagProps) => {
  return <div className="px-2 py-1 rounded-lg border">{title}</div>;
};

export default SubjectTag;
