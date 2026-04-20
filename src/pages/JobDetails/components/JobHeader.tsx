import { useState } from "react";
import {
  MapPin,
  Calendar,
  Share2,
  Send,
  Star,
  CircleDollarSign,
  CircleCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import type { PostJobFormData } from "@/pages/Recruiter/postjob/postJobSchema";
import { IoHeart } from "react-icons/io5";
import { errorToast } from "@/utils/errorToast";
import ApplyModal from "./ApplyModal";
import { useSaveJobMutation } from "@/redux/features/job/job.api";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface JobHeaderProps {
  job: PostJobFormData;
}

export default function JobHeader({ job }: JobHeaderProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [saveJob] = useSaveJobMutation();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const deadlineDate = job.deadline ? new Date(job.deadline) : null;
  const daysLeft =
    deadlineDate && deadlineDate > new Date()
      ? Math.ceil(
          (deadlineDate.getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;
  const handelSave = async (jobId: string) => {
    try {
      if (!user) {
        navigate("/auth/login");
      } else {
        await saveJob(jobId).unwrap();
      }
    } catch (error) {
      errorToast(error);
    }
  };
  const hadnelApply = () => {
    if (!user) {
      navigate("/auth/login");
    } else {
      setIsApplyModalOpen(true);
    }
  };

  return (
    <div className="bg-white  dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <Container className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10 transition-colors py-8">
        {/* Left: Company Logo & Job Title */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="size-24 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 transition-all border border-slate-100 dark:border-slate-700 rounded p-2">
            <img
              src={job.company?.logo}
              alt={job.company?.user?.name || "Company Logo"}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-1">
            <p className="text-[#059669] text-sm font-semibold tracking-wide capitalize">
              {job.company?.user?.name || "Anonymous Company"}
            </p>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight flex flex-wrap items-center gap-3">
              {job.title}
              <CircleCheck className="size-7 text-[#4F46E5] fill-[#4F46E5]/10 shrink-0" />
            </h1>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-slate-500 dark:text-slate-400  text-[15px] pt-1">
              <span className="flex items-center gap-2 capitalize">
                <MapPin className="size-5 text-slate-300 dark:text-slate-600" />
                {job.company?.location || "Location not specified"}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="size-5 text-slate-300 dark:text-slate-600" />
                {job.createdAt
                  ? new Date(job.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider border border-emerald-100 dark:border-emerald-800/50">
                {job.jobType?.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions, Rating & Salary */}
        <div className="flex flex-col items-start lg:items-end gap-4 w-full lg:w-auto mt-4 lg:mt-0">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="icon"
              className="size-10 shrink-0 rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 transition-all active:scale-95"
            >
              <Share2 className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handelSave(job.id ?? "")}
              className={`size-10 shrink-0 rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all active:scale-95 ${job.isSaved ? "text-red-500 fill-red-500" : "text-slate-500"}`}
            >
              <IoHeart className="size-5" />
            </Button>
            <Button
              onClick={hadnelApply}
              disabled={job.isApplied || true}
              className="flex-1 sm:flex-none h-12 px-4 sm:px-12 md:px-20 py-4 rounded bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-3 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <Send className="size-5 rotate-[-20deg]" />
              {job.isApplied ? "Applied" : "Apply Now"}
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-slate-400 dark:text-slate-500 text-sm font-semibold tracking-tight">
              {daysLeft > 0
                ? `${daysLeft} days left to apply`
                : "Applications closed"}
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-4 ${star <= 4 ? "fill-[#F59E0B] text-[#F59E0B]" : "text-slate-200 dark:text-slate-800"}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CircleDollarSign className="size-5 text-[#10b981]" />
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              ${job.salaryMin?.toLocaleString()} - $
              {job.salaryMax?.toLocaleString()}
              <span className="text-sm text-slate-400 dark:text-slate-500 font-bold tracking-normal ml-1">
                /{job.salaryType?.toLowerCase() || "year"}
              </span>
            </p>
          </div>
        </div>
      </Container>
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobId={job.id ?? ""}
        jobTitle={job.title}
      />
    </div>
  );
}
