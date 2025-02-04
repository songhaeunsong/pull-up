import Keyword from './keyword';

interface KeywordListProps {
  keywords: string[];
  color: 'purple' | 'gray';
}

const KeywordList = ({ keywords, color }: KeywordListProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-500 md:border-2 md:text-base">
        키워드
      </div>
      {keywords.map((keyword, id) => (
        <Keyword key={id} title={keyword} color={color} />
      ))}
    </div>
  );
};

export default KeywordList;
