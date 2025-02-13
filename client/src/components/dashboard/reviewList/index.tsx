import SearchBar from '@/components/common/searchbar';
import ReviewCard from '@/components/dashboard/reviewCard';
import convertDate from '@/utils/convertDate';

interface ReviewListProps {
  data: {
    id: number;
    title: string;
    date: string;
    tags: string[] | string;
  }[];
  isProblem?: boolean;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReviewList = ({ data, searchValue, isProblem = true, onSearchChange }: ReviewListProps) => {
  return (
    <article className="flex flex-1 flex-col gap-4 rounded-xl bg-white p-4 md:gap-8 md:p-8">
      {isProblem && <SearchBar value={searchValue} onChange={onSearchChange} />}
      <div className="flex flex-col gap-4">
        {data.map((data) => (
          <ReviewCard
            isProblem={isProblem}
            key={data.id}
            id={data.id}
            title={data.title}
            subtitle={convertDate(data.date)}
            tags={data.tags}
          />
        ))}
      </div>
    </article>
  );
};

export default ReviewList;
