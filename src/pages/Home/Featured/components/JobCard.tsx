import { MapPin, Clock, Star } from "lucide-react";
import CommonWrapper from "@/components/common/CommonWrapper";
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router";

export interface Job {
  id: number;
  company: string;
  logo: string;
  title: string;
  location: string;
  postedAt: string;
  salary: string;
  deadline: string;
  tags: string[];
  rating: number;
  isVerified?: boolean;
}

interface FeaturedJobCardProps {
  job: Job;
}

export default function JobCard({ job }: FeaturedJobCardProps) {
  return (
    <Link to={`/job/${job.id}`}>
      <CommonWrapper className="p-6 group transition-all duration-300 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 relative">
        <button className="absolute top-6 right-6 p-2 rounded-full border dark:bg-slate-950 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors z-10">
          <IoHeart className="size-5" />
        </button>

        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="size-[60px] shrink-0  bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden dark:border-slate-800 group-hover:rotate-6 transition-transform duration-500">
              <img
                src={job.logo}
                alt={job.company}
                className="size-full object-contain"
              />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-primary dark:text-primary  cursor-pointer transition-all">
                {job.company}
              </p>
              <div className="flex items-center">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary dark:group-hover:text-primary transition-colors truncate">
                  {job.title}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold mt-1.5">
                <div className="flex items-center gap-0.5">
                  <MapPin className="size-3.5 text-slate-400/80" />
                  <span className="text-xs">{job.location}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Clock className="size-3.5 text-slate-400/80" />
                  <span className="text-xs">{job.postedAt}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {job.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight border border-slate-100 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-3 ${star <= job.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-800"}`}
                />
              ))}
            </div>
          </div>

          <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                <span className="text-emerald-600 font-black text-xs">$</span>
              </div>
              <p className="text-lg font-black text-slate-900 dark:text-white">
                {job.salary}
                <span className="text-slate-400 text-sm font-bold">/year</span>
              </p>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">
              {job.deadline}
            </p>
          </div>
        </div>
      </CommonWrapper>
    </Link>
  );
}
