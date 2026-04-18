import { MapPin, Clock, Star } from "lucide-react";
import CommonWrapper from "@/components/common/CommonWrapper";
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router";
import type { PostJobFormData } from "@/pages/Recruiter/postjob/postJobSchema";
import { cn } from "@/lib/utils";

interface FeaturedJobCardProps {
  job: PostJobFormData;
  onSave: (jobId: string) => void;
  isSaving: boolean;
}

export default function JobCard({
  job,
  onSave,
  isSaving,
}: FeaturedJobCardProps) {
  return (
    <Link to={`/job/${job.id}`}>
      <CommonWrapper className="p-4 sm:p-6 group transition-all duration-300 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 relative ">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSave(job.id!);
          }}
          className={`absolute top-6 right-6 p-2 cursor-pointer rounded-full border dark:bg-slate-950  hover:text-red-500 dark:hover:text-red-400 transition-colors z-10 ${job.isSaved ? "text-red-500" : "text-slate-400 dark:text-slate-500"}`}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <IoHeart className="size-5" />
          )}
        </button>
        <div className="space-y-5">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="size-12 sm:size-15 shrink-0 dark:bg-slate-950 flex items-center justify-center overflow-hidden dark:border-slate-800 transition-transform duration-500">
              <img
                src={job.company?.logo}
                alt={job.company?.user?.name}
                className="size-full object-contain"
              />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-primary dark:text-primary  cursor-pointer transition-all">
                {job.company?.user?.name}
              </p>
              <div className="flex items-center group/title">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover/title:text-primary dark:group-hover/title:text-primary transition-colors line-clamp-1">
                  {job.title}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold mt-1.5">
                <div className="flex items-center gap-0.5">
                  <MapPin className="size-3.5 text-slate-400/80" />
                  <span className="text-xs">{job.company?.location}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Clock className="size-3.5 text-slate-400/80" />
                  <span className="text-xs">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            {/* <div className="flex flex-wrap gap-2">
              {job.tags.slice(0, 2).map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight border border-slate-100 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div> */}
            <div className="flex items-center gap-0.5 sm:justify-end">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "size-3",
                    star <= 2
                      ? "text-amber-400 fill-amber-400"
                      : "text-slate-200 dark:text-slate-800",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                <span className="text-emerald-600 font-black text-xs">$</span>
              </div>
              <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {job.salaryMin}
                <span className="text-slate-400 text-sm font-bold">/</span>
                {job.salaryMax}
              </p>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold sm:text-right">
              {job.deadline
                ? new Date(job.deadline).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </CommonWrapper>
    </Link>
  );
}
