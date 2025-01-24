interface ContentSectionProps {
  title: string;
  content: string;
}

const ContentSection = ({ title, content }: ContentSectionProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="w-fit rounded-2xl bg-stone-50 px-4 py-2 text-lg font-medium">{title}</div>
      <div className="w-full rounded-2xl bg-stone-50 p-6 text-xl">{content}</div>
    </div>
  );
};

export default ContentSection;
