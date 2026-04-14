import {
  Globe,
  Mail,
  Users,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Plus,
  Briefcase,
  GraduationCap,
  Calendar,
  Layers,
  User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PostJobFormData } from "@/pages/Recruiter/postjob/postJobSchema";

interface JobSidebarProps {
  job: PostJobFormData;
}

export default function JobSidebar({ job }: JobSidebarProps) {
  const overviewItems = [
    {
      label: "Job Category",
      value: job.category || "General",
      icon: Layers,
    },
    {
      label: "Experience",
      value: job.experience || "Not specified",
      icon: Briefcase,
    },
    {
      label: "Career Level",
      value: job.careerLevel || "Not specified",
      icon: User2,
    },
    {
      label: "Qualification",
      value: job.qualification || "Not specified",
      icon: GraduationCap,
    },
    {
      label: "Application Deadline",
      value: job.deadline
        ? new Date(job.deadline).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A",
      icon: Calendar,
    },
  ];

  const companyInfo = [
    {
      label: "Company",
      value: job.company?.user?.name || "Anonymous",
      icon: Globe,
      color: "text-emerald-500",
    },
    {
      label: "Email",
      value: job.company?.user?.email || "Not specified",
      icon: Mail,
      color: "text-blue-500",
    },
    {
      label: "Location",
      value: job.company?.location || "Not specified",
      icon: Users,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Job Overview */}
      <div className="bg-slate-50 dark:bg-slate-900/40 rounded p-6 border border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          Job Overview
        </h3>
        <div className="space-y-5">
          {overviewItems.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="size-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center shrink-0">
                <item.icon className="size-5 text-emerald-500" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Company */}
      <div className="bg-slate-50 dark:bg-slate-900/40 rounded p-6 border border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          About Company
        </h3>
        <div className="space-y-4 mb-6">
          {companyInfo.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between group cursor-default border-b pb-3 border-slate-200/50 dark:border-slate-800/50 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-2">
                <item.icon className={`size-4 ${item.color}`} />
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[150px]">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <Button className="w-full h-12 bg-white hover:bg-slate-100 text-emerald-600 border border-emerald-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700/50 font-bold rounded shadow-sm transition-all active:scale-[0.98]">
          <Plus className="size-4 mr-2" />
          Follow Company
        </Button>

        <div className="pt-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Official Socials
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
              <Button
                key={i}
                variant="outline"
                size="icon"
                className="size-10 rounded-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 transition-all hover:-translate-y-1"
              >
                <Icon className="size-4" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
