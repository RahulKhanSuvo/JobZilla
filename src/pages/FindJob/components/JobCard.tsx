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
    <CommonWrapper className="p-6 group transition-all duration-300 border hover:border-primary relative ">
      <button className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-red-500 transition-colors">
        <Heart className="size-5" />
      </button>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="size-14 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden p-2 group-hover:scale-105 transition-transform">
            <img
              src={job.logo}
              alt={job.company}
              className="size-full object-contain"
            />
          </div>
          <div className="space-y-1 mt-1">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-tight">
              {job.company}
            </p>
            <h4 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
              {job.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            <span className="text-xs font-medium">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            <span className="text-xs font-medium">{job.postedAt}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600 uppercase"
            >
              {tag}
            </span>
          ))}
          <div className="flex items-center gap-1 ml-auto">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`size-3 ${star <= job.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">{job.salary}</p>
            <p className="text-[10px] text-slate-400 font-medium italic">
              {job.deadline}
            </p>
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
}
