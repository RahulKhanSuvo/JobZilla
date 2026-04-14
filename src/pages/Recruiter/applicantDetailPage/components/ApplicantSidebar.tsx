import type { Application } from "@/types/application";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import CommonWrapper from "@/components/common/CommonWrapper";

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
  const { user, job } = application;
  const candidate = user.candidate;

  return (
    <div className="space-y-4">
      {/* Info Card */}
      <CommonWrapper className="px-6 py-2 divide-y divide-slate-100">
        <InfoRow label="Applied For" value={job.title} />
        <InfoRow label="Location" value={candidate.location ?? "—"} />
        <InfoRow label="Email" value={user.email ?? "—"} />
        <InfoRow label="Language" value={candidate.language ?? "—"} />
        <InfoRow
          label="Status"
          value={
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                application.status === "ACCEPTED"
                  ? "bg-emerald-50 text-emerald-600"
                  : application.status === "REJECTED"
                    ? "bg-red-50 text-red-600"
                    : application.status === "SHORTLISTED"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-amber-50 text-amber-600"
              }`}
            >
              {application.status.charAt(0) +
                application.status.slice(1).toLowerCase()}
            </span>
          }
        />
      </CommonWrapper>

      {/* Social Links */}
      {(candidate as {
        facebook?: string;
        linkedin?: string;
        twitter?: string;
      }) && (
        <CommonWrapper className="px-6 py-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Social Links
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="size-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href="#"
              className="size-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href="#"
              className="size-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-sky-50 hover:text-sky-500 transition-colors"
            >
              <Twitter className="size-4" />
            </a>
          </div>
        </CommonWrapper>
      )}

      {/* CV Download */}
      {/* <CommonWrapper className="px-6 py-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Resume
        </p>
        <div className="flex items-center gap-3 p-3 rounded bg-slate-50 border border-slate-100 mb-4">
          <div className="size-10 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
            <span className="text-rose-500 text-xs font-bold">PDF</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {resume.title}
            </p>
            <p className="text-xs text-slate-400">PDF Document</p>
          </div>
        </div>
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"
          asChild
        >
          <a href={resume.fileUrl} target="_blank" rel="noreferrer">
            <Download className="size-4" />
            Download CV
          </a>
        </Button>
      </CommonWrapper> */}
    </div>
  );
}
