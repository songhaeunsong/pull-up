import { Skeleton } from '@/components/ui/skeleton';

const ExamSolutionSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-primary-200 bg-white px-7 py-7">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-16" /> {/* '해설' 텍스트 자리 */}
        <Skeleton className="h-8 w-20 rounded-lg" /> {/* 버튼 자리 */}
      </div>
    </div>
  );
};

export default ExamSolutionSkeleton;
