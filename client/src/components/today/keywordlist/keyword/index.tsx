interface KeywordProps {
  title: string;
  color: 'purple' | 'gray';
}

const Keyword = ({ title, color }: KeywordProps) => {
  return (
    <div
      className={`rounded-lg px-4 py-1 text-center ${color === 'purple' ? 'bg-primary-500 text-white' : 'bg-stone-100 text-stone-700'}`}
    >
      {title}
    </div>
  );
};

export default Keyword;
