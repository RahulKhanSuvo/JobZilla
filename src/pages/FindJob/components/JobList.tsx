import { motion, type Variants } from "framer-motion";
import demoLogo from "@assets/logos/profile-1.jpg";
import JobCard from "@/pages/Home/Featured/components/JobCard";

const mockFeaturedJobs = [
  {
    id: 1,
    company: "Rockstar Games New York",
    logo: demoLogo,
    title: "Senior UI/UX Designer",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,000 - $2,000",
    deadline: "2 days left to apply",
    tags: ["Accounting", "Sales & Marketing", "UI UX Design"],
    rating: 4,
    isVerified: true,
  },
  {
    id: 2,
    company: "Rockstar Games New York",
    logo: demoLogo,
    title: "Project Manager",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,000 - $1,300",
    deadline: "5 days left to apply",
    tags: ["UI UX Design", "Accounting"],
    rating: 4,
    isVerified: true,
  },
  {
    id: 3,
    company: "Rockstar Games New York",
    logo: demoLogo,
    title: "Full Stack Development",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$2,000 - $2,400",
    deadline: "6 days left to apply",
    tags: ["UI UX Design", "Project Manager", "Accounting"],
    rating: 4,
    isVerified: true,
  },
  {
    id: 4,
    company: "Rockstar Games New York",
    logo: demoLogo,
    title: "Social Media Marketing",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,100 - $1,500",
    deadline: "7 days left to apply",
    tags: ["UI UX Design", "Project Manager"],
    rating: 4,
    isVerified: true,
  },
  {
    id: 5,
    company: "Rockstar Games New York",
    logo: demoLogo,
    title: "Senior DevOps Engineer",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,500 - $1,800",
    deadline: "3 days left to apply",
    tags: ["Sales & Marketing", "Accounting"],
    rating: 4,
    isVerified: true,
  },
  {
    id: 6,
    company: "Rockstar Games New York",
    logo: demoLogo,
    title: "HR Administration",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,100 - $1,400",
    deadline: "5 days left to apply",
    tags: ["UI UX Design", "Accounting"],
    rating: 4,
    isVerified: true,
  },
];

interface JobListProps {
  layout: "grid" | "list";
}

export default function JobList({ layout }: JobListProps) {
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
      {mockFeaturedJobs.map((job) => (
        <motion.div key={job.id} variants={item}>
          <JobCard job={job} />
        </motion.div>
      ))}
    </motion.div>
  );
}
