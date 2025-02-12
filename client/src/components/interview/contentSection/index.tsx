interface ContentSectionProps {
  title: string;
  content: string;
}

const ContentSection = ({ title, content }: ContentSectionProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="w-fit rounded-2xl bg-white px-4 py-2 text-lg font-medium md:bg-stone-50">{title}</div>
      <div className="w-full break-all rounded-2xl bg-white p-6 text-left text-lg md:bg-stone-50 md:text-xl">
        {content}
      </div>
    </div>
  );
};

export default ContentSection;
