import JobCard from "@/pages/Home/Featured/components/JobCard";
import { useGetCompanyJobsQuery } from "@/redux/features/job/job.api";

export default function RelatedJobs({ companyId }: { companyId: string }) {
  const { data: companyJobs } = useGetCompanyJobsQuery(companyId);
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
