import { Skeleton } from "@/components/ui/skeleton";
import JobCard from "@/pages/Home/Featured/components/JobCard";
import { useGetCompanyJobsQuery } from "@/redux/features/job/job.api";
import { skipToken } from "@reduxjs/toolkit/query";

export default function RelatedJobs({
  companyId,
}: {
  companyId: string | undefined;
}) {
  const { data: companyJobs, isLoading } = useGetCompanyJobsQuery(
    companyId || skipToken,
  );
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        Join our team
      </h3>
      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[200px] p-6 rounded-xl border border-border/50 bg-slate-50/50 dark:bg-slate-800/20 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="space-y-2 mt-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex gap-2 mt-auto pt-2">
                  <Skeleton className="h-9 w-full rounded" />
                  <Skeleton className="h-9 w-10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : companyJobs?.data?.length === 0 ? (
          <div className="text-center space-y-4">
            <p className="text-slate-400 dark:text-slate-500 font-bold">
              No jobs found
            </p>
          </div>
        ) : (
          companyJobs?.data?.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={() => {}}
              isSaving={false}
            />
          ))
        )}
      </div>
    </div>
  );
}
