import JobCard, { type Job } from "@/pages/Home/Featured/components/JobCard";

const relatedJobs: Job[] = [
  {
    id: 101,
    company: "Rockstar Games New York",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=RG",
    title: "Senior UI/UX Designer",
    location: "Las Vegas, NV 89107, USA",
    postedAt: "2 days ago",
    salary: "$1,300 - $2,000/year",
    deadline: "2 days left to apply",
    tags: ["UI UX Design", "Sketch", "Figma"],
    rating: 5,
  },
  {
    id: 102,
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

export default function RelatedJobs() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        Related jobs
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
