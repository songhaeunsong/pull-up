interface KeywordProps {
  title: string;
  color: 'purple' | 'gray';
}

const Keyword = ({ title, color }: KeywordProps) => {
  return (
    <div
      className={`py-1 px-4 rounded-lg text-center ${color === 'purple' ? ' bg-primary-500 text-white' : 'bg-stone-100 text-stone-700'}`}
    >
      {title}
    </div>
  );
};

export default Keyword;
