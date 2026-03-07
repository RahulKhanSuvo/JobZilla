import { Heart, MapPin, Clock, Star } from "lucide-react";
import CommonWrapper from "@/components/common/CommonWrapper";

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
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <CommonWrapper className="p-6 group transition-all duration-300 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 relative rounded-2xl hover:shadow-[0_20px_40px_rgba(16,185,129,0.05)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1">
      <button className="absolute top-6 right-6 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors shadow-sm">
        <Heart className="size-5" />
      </button>

      <div className="space-y-6">
        <div className="flex items-start gap-5">
          <div className="size-16 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden p-3 border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform duration-500">
            <img
              src={job.logo}
              alt={job.company}
              className="size-full object-contain"
            />
          </div>
          <div className="space-y-1.5 mt-1">
            <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md inline-block">
              {job.company}
            </p>
            <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {job.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-5 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-emerald-500/70" />
            <span className="text-xs font-bold">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-emerald-500/70" />
            <span className="text-xs font-bold">{job.postedAt}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight border border-slate-100 dark:border-slate-800"
            >
              {tag}
            </span>
          ))}
          <div className="flex items-center gap-1 ml-auto">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`size-3 ${star <= job.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-800"}`}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
              {job.salary}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
              {job.deadline}
            </p>
          </div>
          <button className="text-xs font-black text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all active:scale-95">
            Apply Now
          </button>
        </div>
      </div>
    </CommonWrapper>
  );
}
