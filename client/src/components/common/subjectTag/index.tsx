interface SubjectTagProps {
  title: string;
}

const SubjectTag = ({ title }: SubjectTagProps) => {
  return (
    <div className="rounded-lg border border-secondary-600 bg-secondary-50 px-[4px] py-[2px] text-[10px] text-secondary-600 lg:px-2 lg:py-1 lg:text-xs">
      {title}
    </div>
  );
};

export default SubjectTag;
