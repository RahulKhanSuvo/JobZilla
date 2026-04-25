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
import { Button } from "@/components/ui/button";

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
      <div className="mt-12 flex justify-center">
        <Button
          asChild
          variant={"outline"}
          className="group text-primary border-primary hover:bg-primary hover:text-white"
        >
          <Link to="/find-job">
            See More Jobs
            <MoveRight className="size-5 group-hover:translate-x-1 transition-transform group-hover:text-white" />
          </Link>
        </Button>
      </div>
    </Container>
  );
}
