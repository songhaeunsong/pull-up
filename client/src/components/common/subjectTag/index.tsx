interface SubjectTagProps {
  title: string;
}

const SubjectTag = ({ title }: SubjectTagProps) => {
  return (
    <div className="px-2 py-1 rounded-lg border text-xs border-secondary-600 text-secondary-600 bg-secondary-50">
      {title}
    </div>
  );
};

export default SubjectTag;
