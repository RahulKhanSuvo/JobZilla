import Container from "@/components/common/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobDetailsSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Header Skeleton */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <Container className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10 py-6 lg:py-8">
          <div className="flex flex-row items-start gap-4 sm:gap-6 w-full lg:w-2/3">
            <Skeleton className="size-16 sm:size-20 lg:size-24 rounded border border-slate-100 dark:border-slate-700 shrink-0" />
            <div className="space-y-3 w-full pt-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 sm:h-8 w-3/4 max-w-[400px]" />
              <div className="flex gap-4 pt-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-24 rounded-lg mt-2" />
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-4 w-full lg:w-auto">
            <div className="flex gap-2 sm:gap-3 w-full lg:w-auto">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-11 sm:h-12 w-32 sm:w-40 rounded" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-6 w-48 mt-1" />
          </div>
        </Container>
      </div>

      <Container className="space-y-6 mt-6">
        <div className="grid grid-cols-1 pb-16 lg:pb-24 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex gap-6 border-b border-slate-200 dark:border-slate-800 pb-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-4 pt-4">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full mt-6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <aside className="lg:col-span-4 space-y-8 order-first lg:order-last">
            <div className="border-slate-200 dark:border-slate-800 rounded-lg p-6 space-y-6">
              <Skeleton className="h-6 w-1/2" />
              <div className="space-y-6 mt-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="size-10 rounded-lg shrink-0" />
                    <div className="space-y-2 w-full pt-1">
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
