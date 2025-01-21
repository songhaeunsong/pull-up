import Keyword from './keyword';

interface KeywordListProps {
  keywords: {
    title: string;
    correct: boolean;
  }[];
}

const KeywordList = ({ keywords }: KeywordListProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg border-2 border-primary-200 bg-primary-50 px-3 py-1 font-semibold text-primary-500">
        키워드
      </div>
      {keywords.map((keyword, id) => (
        <Keyword key={id} title={keyword.title} color={keyword.correct ? 'purple' : 'gray'} />
      ))}
    </div>
  );
};

export default KeywordList;
