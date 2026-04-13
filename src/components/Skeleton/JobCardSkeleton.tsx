import CommonWrapper from "../common/CommonWrapper";
import { Skeleton } from "../ui/skeleton";

export function JobCardSkeleton() {
  return (
    <CommonWrapper className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="space-y-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <Skeleton className="size-12 sm:size-15 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-3/4 sm:w-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 sm:w-20 rounded-lg" />
            <Skeleton className="h-8 w-16 sm:w-20 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-16 sm:w-20" />
        </div>

        <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </CommonWrapper>
  );
}
