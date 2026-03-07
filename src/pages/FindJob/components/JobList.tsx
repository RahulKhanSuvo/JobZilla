import JobCard, { type Job } from "./JobCard";

const mockJobs: Job[] = [
  {
    id: 1,
    company: "Rockstar Games New York",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=RG",
    title: "Senior UI/UX Designer",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,000 - $2,000/year",
    deadline: "2 days left to apply",
    tags: ["UI UX Design", "Project Manager", "Accounting"],
    rating: 5,
  },
  {
    id: 2,
    company: "Rockstar Games New York",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=RG",
    title: "Full Stack Development",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,100 - $1,500/year",
    deadline: "7 days left to apply",
    tags: ["UI UX Design", "Project Manager"],
    rating: 4,
  },
  {
    id: 3,
    company: "Rockstar Games New York",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=RG",
    title: "Social Media Marketing",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,100 - $1,400/year",
    deadline: "5 days left to apply",
    tags: ["UI UX Design", "Accounting"],
    rating: 4,
  },
  {
    id: 4,
    company: "Rockstar Games New York",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=RG",
    title: "Senior DevOps Engineer",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,300 - $1,500/year",
    deadline: "5 days left to apply",
    tags: ["Project Manager", "Sales & Marketing", "Accounting"],
    rating: 5,
  },
  {
    id: 5,
    company: "Rockstar Games New York",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=RG",
    title: "HR Administration",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,000 - $5,000/year",
    deadline: "4 days left to apply",
    tags: ["UI UX Design", "Project Manager", "Sales & Marketing"],
    rating: 4,
  },
  {
    id: 6,
    company: "Rockstar Games New York",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=RG",
    title: "Project Manager",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "5 days ago",
    salary: "$1,000 - $1,300/year",
    deadline: "5 days left to apply",
    tags: ["Project Manager"],
    rating: 5,
  },
];

export default function JobList() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mockJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
