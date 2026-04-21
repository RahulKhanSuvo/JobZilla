import React from "react";
import type { Application } from "@/types/application";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import CommonWrapper from "@/components/common/CommonWrapper";
import { Badge } from "@/components/ui/badge";

interface Props {
  application: Application;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start py-4 border-b border-slate-100 last:border-b-0">
      <span className="text-sm text-slate-400 font-medium">{label}</span>
      <span className="text-sm font-semibold text-slate-800 text-right max-w-[55%]">
        {value}
      </span>
    </div>
  );
}

export default function ApplicantSidebar({ application }: Props) {
  const user = application?.user;
  const job = application?.job;
  const candidate = user?.candidate;

  return (
    <div className="space-y-4">
      {/* Quick Info Card */}
      <CommonWrapper className="px-6 py-2 divide-y divide-slate-100 dark:divide-slate-800">
        <InfoRow label="Applied For" value={job?.title || "—"} />
        <InfoRow label="Location" value={candidate?.location ?? "Remote"} />
        <InfoRow label="Email" value={user?.email ?? "—"} />
        <InfoRow
          label="Languages"
          value={
            user?.languages?.length ? (
              <div className="flex flex-wrap justify-end gap-1">
                {user.languages.map((lang) => (
                  <Badge
                    key={lang.id}
                    variant="secondary"
                    className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-0 text-[10px] font-bold"
                  >
                    {lang.language}
                  </Badge>
                ))}
              </div>
            ) : (
              "—"
            )
          }
        />
        <div className="flex justify-between items-start py-4 border-b border-slate-100 last:border-b-0">
          <span className="text-sm text-slate-400 font-medium">Status</span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
              application?.status === "HIRED"
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                : application?.status === "REJECTED"
                  ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                  : application?.status === "SHORTLISTED"
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                    : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
            }`}
          >
            {application?.status || "PENDING"}
          </span>
        </div>
      </CommonWrapper>

      {/* Social Profiles */}
      <CommonWrapper className="px-6 py-5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
          Professional Links
        </p>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 transition-all duration-300 border border-slate-100 dark:border-slate-700/50"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="#"
            className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-50 hover:text-sky-500 dark:hover:bg-sky-500/10 transition-all duration-300 border border-slate-100 dark:border-slate-700/50"
          >
            <Twitter className="size-4" />
          </a>
          <a
            href="#"
            className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 transition-all duration-300 border border-slate-100 dark:border-slate-700/50"
          >
            <Facebook className="size-4" />
          </a>
        </div>
      </CommonWrapper>

      {/* Target Job Info */}
      <CommonWrapper className="px-6 py-1 divide-y divide-slate-100 dark:divide-slate-800">
        <div className="py-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
            Target Job Info
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Exp. Level</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                {job?.experience || "—"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Career Level</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {job?.careerLevel?.replace("_", " ") || "—"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Offered Salary</span>
              <span className="text-xs font-bold text-emerald-600">
                ${job?.salaryMin || 0} — ${job?.salaryMax || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Deadline</span>
              <span className="text-xs font-bold text-rose-500">
                {job?.deadline
                  ? new Date(job.deadline).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
