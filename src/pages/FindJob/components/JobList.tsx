import { motion, type Variants } from "framer-motion";
import JobCard from "@/pages/Home/Featured/components/JobCard";
import type { PostJobFormData } from "@/pages/Recruiter/postjob/postJobSchema";
import { useSaveJobMutation } from "@/redux/features/job/job.api";
import { errorToast } from "@/utils/errorToast";
import { useState } from "react";
import { JobCardSkeleton } from "@/components/Skeleton/JobCardSkeleton";

interface JobListProps {
  layout: "grid" | "list";
  jobs: PostJobFormData[];
  isLoading?: boolean;
}

export default function JobList({ layout, jobs, isLoading }: JobListProps) {
  const [savingJobId, setSavingJobId] = useState<string | null>(null);
  const [saveJob] = useSaveJobMutation();
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };
  // handel save
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
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={
        layout === "grid"
          ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
          : "flex flex-col gap-6"
      }
    >
      {isLoading
        ? Array.from({ length: 10 }).map((_, idx) => (
            <JobCardSkeleton key={idx} />
          ))
        : jobs.map((job) => (
            <motion.div key={job.id} variants={item}>
              <JobCard
                job={job}
                onSave={handelSave}
                isSaving={savingJobId === job.id}
              />
            </motion.div>
          ))}
    </motion.div>
  );
}
