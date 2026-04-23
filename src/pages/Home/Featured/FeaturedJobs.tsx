import Container from "@/components/common/Container";
import FeaturedJobsHeader from "./components/FeaturedJobsHeader";
import { MoveRight } from "lucide-react";
import JobCard from "./components/JobCard";
import { Link } from "react-router";
import {
  useGetAllJobsQuery,
  useSaveJobMutation,
} from "@/redux/features/job/job.api";
import { useState } from "react";
import { errorToast } from "@/utils/errorToast";
import { JobCardSkeleton } from "@/components/Skeleton/JobCardSkeleton";

export default function FeaturedJobs() {
  const { data: jobs, isLoading } = useGetAllJobsQuery({
    limit: 6,
  });
  const [savingJobId, setSavingJobId] = useState<string | null>(null);
  const [saveJob] = useSaveJobMutation();
  const handelSave = async (jobId: string) => {
    try {
      setSavingJobId(jobId);
      await saveJob(jobId).unwrap();
    } catch (error) {
      errorToast(error);
    } finally {
      setSavingJobId(null);
    }
  };
  return (
    <Container className="py-20">
      <FeaturedJobsHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <JobCardSkeleton key={idx} />
            ))
          : jobs?.data.map((job) => (
              <JobCard
                onSave={handelSave}
                isSaving={savingJobId === job.id}
                key={job.id}
                job={job}
              />
            ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/find-job" className="text-center">
          <button className="inline-flex cursor-pointer items-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-900 border-2 border-emerald-500/20 dark:border-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-300 group active:scale-95">
            See More Jobs
            <MoveRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </Container>
  );
}
