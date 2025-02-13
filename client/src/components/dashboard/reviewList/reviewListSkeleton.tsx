import { Skeleton } from '@/components/ui/skeleton';
import ReviewCardSkeleton from '../reviewCard/reviewCardSkeleton';

const ReviewListSkeleton = () => {
  return (
    <article className="flex flex-1 flex-col gap-4 rounded-xl bg-white p-4 md:gap-8 md:p-8">
      {/* SearchBar 스켈레톤 */}
      <Skeleton className="h-10 w-full rounded-md" />

      {/* ReviewCard 스켈레톤 */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <ReviewCardSkeleton key={index} />
        ))}
      </div>
    </article>
  );
};

export default ReviewListSkeleton;
