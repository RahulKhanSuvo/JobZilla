import type { Application } from "@/types/application";
import { Download, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  application: Application;
}

export default function ApplicantHeader({ application }: Props) {
  const { user, resume, job } = application;
  const candidate = user.candidate;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-6 flex flex-col md:flex-row items-start md:items-center gap-6">
      {/* Avatar */}
      <div className="shrink-0">
        <img
          src={
            candidate.profileImage ??
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
          }
          alt={user.name}
          className="size-20 rounded-2xl object-cover bg-slate-100 ring-4 ring-slate-50"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-2">
        <Badge className="bg-emerald-50 text-emerald-600 border-0 text-xs font-semibold">
          Available now
        </Badge>
        <p className="text-sm font-bold text-emerald-600 uppercase tracking-tight">
          {job.title}
        </p>
        <h1 className="text-2xl font-extrabold text-slate-900 leading-tight truncate">
          {user.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
            <span>📍</span> {candidate.location}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 shrink-0">
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 gap-2"
          asChild
        >
          <a href={resume.fileUrl} target="_blank" rel="noreferrer">
            <Download className="size-4" />
            Download CV
          </a>
        </Button>
        <Button variant="outline" className="font-bold px-6 gap-2">
          <MessageSquare className="size-4" />
          Message
        </Button>
      </div>
    </div>
  );
}
