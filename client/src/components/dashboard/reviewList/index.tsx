import SearchBar from '@/components/common/searchbar';
import ReviewCard from '@/components/dashboard/reviewCard';

interface ReviewListProps {
  data: {
    id: number;
    title: string;
    date: string;
    tags: string[] | string;
  }[];
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReviewList = ({ data, searchValue, onSearchChange }: ReviewListProps) => {
  return (
    <article className="flex flex-col gap-8 rounded-xl bg-white px-8 py-8">
      <SearchBar value={searchValue} onChange={onSearchChange} />
      <div className="flex flex-col gap-5">
        {data.map((data) => (
          <ReviewCard key={data.id} title={data.title} subtitle={data.date} tags={data.tags} />
        ))}
      </div>
    </article>
  );
};

export default ReviewList;
