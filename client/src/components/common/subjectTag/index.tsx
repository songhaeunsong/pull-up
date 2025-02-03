interface SubjectTagProps {
  title: string;
}

const SubjectTag = ({ title }: SubjectTagProps) => {
  return (
    <div className="rounded-lg border border-secondary-600 bg-secondary-50 px-2 py-1 text-xs text-secondary-600">
      {title}
    </div>
  );
};

export default SubjectTag;
