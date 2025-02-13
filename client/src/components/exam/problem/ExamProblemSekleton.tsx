import { Skeleton } from '@/components/ui/skeleton';

const ExamProblemSkeleton = () => {
  return (
    <div className="flex flex-col gap-7 rounded-xl border border-primary-200 bg-white p-7">
      {/* 질문 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-full" />
      </div>

      {/* 답안 선택 섹션 */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-full rounded-md" /> {/* 첫 번째 선택지 */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* 두 번째 선택지 */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* 세 번째 선택지 */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* 네 번째 선택지 */}
      </div>
    </div>
  );
};

export default ExamProblemSkeleton;
