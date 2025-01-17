interface AnswerContainerProps {
  title: string;
  content: string;
}

const AnswerContainer = ({ title, content }: AnswerContainerProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-4 py-2 rounded-2xl bg-stone-50 text-lg font-medium">{title}</div>
      <div className="p-6 rounded-2xl bg-stone-50 text-xl">{content}</div>
    </div>
  );
};

export default AnswerContainer;
