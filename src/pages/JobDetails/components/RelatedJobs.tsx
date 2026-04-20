import JobCard from "@/pages/Home/Featured/components/JobCard";
import { useGetCompanyJobsQuery } from "@/redux/features/job/job.api";
import { skipToken } from "@reduxjs/toolkit/query";

export default function RelatedJobs({
  companyId,
}: {
  companyId: string | undefined;
}) {
  const { data: companyJobs } = useGetCompanyJobsQuery(companyId || skipToken);
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        Join our team
      </h3>
      <div className="grid grid-cols-1 gap-6">
        {companyJobs?.data?.map((job) => (
          <JobCard key={job.id} job={job} onSave={() => {}} isSaving={false} />
        ))}
      </div>
    </div>
  );
}
