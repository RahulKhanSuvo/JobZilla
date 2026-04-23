import CommonWrapper from "@/components/common/CommonWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobFormSkeleton() {
  return (
    <CommonWrapper className="p-8 space-y-8 animate-pulse">
      <div className="space-y-6">
        {/* Job Title Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded" />
        </div>

        {/* 2-Column Grid Fields (12 fields = 6 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-12 w-full rounded" />
            </div>
          ))}
        </div>

        {/* Job Description Field */}
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-64 w-full rounded" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 flex justify-end">
        <Skeleton className="h-12 w-48 rounded" />
      </div>
    </CommonWrapper>
  );
}
