import { Download, Trash2, Edit3, MoreVertical, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { IResume } from "@/redux/features/candidate/resume.api";

interface ResumeCardProps {
  resume: IResume;
  onDelete: (id: string) => void;
  onSetPrimary: (id: string) => void;
}

const ResumeCard = ({ resume, onDelete, onSetPrimary }: ResumeCardProps) => {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] border border-border p-5 space-y-4 hover:shadow-lg transition-all group flex flex-col h-full rounded">
      {/* Review/Preview area */}
      <div className="h-48 bg-[#F8F9FA] dark:bg-[#222222] rounded-lg flex items-center justify-center relative overflow-hidden shrink-0 border border-border/50">
        <FileText className="size-16 text-primary/20" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 pointer-events-none">
          {resume.isPrimary && (
            <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-sm">
              Primary
            </span>
          )}
          {resume.isDraft && (
            <span className="bg-slate-500 text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-sm">
              Draft
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="grow space-y-1">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-[15px] line-clamp-1 grow pr-2">
            {resume.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="gap-2">
                <Edit3 className="size-4 text-blue-500" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2"
                onClick={() => window.open(resume.fileUrl, "_blank")}
              >
                <Download className="size-4 text-green-500" />
                <span>Download</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 text-red-500"
                onClick={() => onDelete(resume.id)}
              >
                <Trash2 className="size-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-muted-foreground text-[12px]">
          Uploaded {new Date(resume.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/50">
        <div className="flex items-center gap-3">
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Edit3 className="size-4" />
          </button>
          <button
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={() => window.open(resume.fileUrl, "_blank")}
          >
            <Download className="size-4" />
          </button>
          <button
            className="text-muted-foreground hover:text-red-500 transition-colors"
            onClick={() => onDelete(resume.id)}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        {!resume.isPrimary && (
          <button
            onClick={() => onSetPrimary(resume.id)}
            className="text-primary text-[13px] font-semibold hover:underline"
          >
            Set as Primary
          </button>
        )}
      </div>
    </div>
  );
};

export default ResumeCard;
