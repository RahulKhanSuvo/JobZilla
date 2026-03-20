import Container from "@/components/common/Container";
import FeaturedJobsHeader from "./components/FeaturedJobsHeader";
import { MoveRight } from "lucide-react";
import demoLogo from "@assets/logos/profile-1.jpg";
import JobCard, { type Job } from "./components/JobCard";
import { Link } from "react-router";

const mockFeaturedJobs: Job[] = [
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

export default function FeaturedJobs() {
  return (
    <Container className="py-20">
      <FeaturedJobsHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {mockFeaturedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
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
