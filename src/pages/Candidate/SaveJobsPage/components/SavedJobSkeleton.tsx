import { Skeleton } from "@/components/ui/skeleton";

export default function SavedJobSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_150px_200px_80px] items-center py-4 border-b border-gray-100 dark:border-slate-800 last:border-0 px-4">
      {/* Job Info Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-3.5 rounded-full" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </div>

      {/* Category Skeleton */}
      <div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      {/* Date Skeleton */}
      <div>
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Action Skeleton */}
      <div className="flex justify-end">
        <Skeleton className="size-8 rounded-md" />
      </div>
    </div>
  );
}
