import { motion, type Variants } from "framer-motion";
import JobCard from "@/pages/Home/Featured/components/JobCard";
import type { PostJobFormData } from "@/pages/Recruiter/postjob/postJobSchema";

interface JobListProps {
  layout: "grid" | "list";
  jobs: PostJobFormData[];
}

export default function JobList({ layout, jobs }: JobListProps) {
  console.log(jobs);

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
      {jobs.map((job) => (
        <motion.div key={job.id} variants={item}>
          <JobCard job={job} />
        </motion.div>
      ))}
    </motion.div>
  );
}
