import { Skeleton } from '@/components/ui/skeleton';

const ReviewCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 shadow-sm">
      <Skeleton className="h-[20px] w-3/4 rounded-md" />
      <Skeleton className="h-[16px] w-1/2 rounded-md" />
      <Skeleton className="h-[14px] w-1/3 rounded-md" />
    </div>
  );
};

export default ReviewCardSkeleton;
