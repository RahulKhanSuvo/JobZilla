import { useState } from "react";
import CommonWrapper from "@/components/common/CommonWrapper";
import DashboardTitle from "@/components/common/DashboardTitle";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Download,
  Trash2,
  Edit3,
  MoreVertical,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Resume {
  id: number;
  title: string;
  date: string;
  isPrimary: boolean;
  isDraft: boolean;
}

const ResumeCard = ({
  resume,
  onDelete,
  onSetPrimary,
}: {
  resume: Resume;
  onDelete: (id: number) => void;
  onSetPrimary: (id: number) => void;
}) => {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] border border-border  p-5 space-y-4 hover:shadow-lg transition-all group flex flex-col h-full">
      {/* Review/Preview area */}
      <div className="h-48 bg-[#F8F9FA] dark:bg-[#222222] rounded-lg flex items-center justify-center relative overflow-hidden shrink-0">
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
              <DropdownMenuItem className="gap-2">
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
          Edited {resume.date}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/50">
        <div className="flex items-center gap-3">
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Edit3 className="size-4" />
          </button>
          <button className="text-muted-foreground hover:text-primary transition-colors">
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

const UploadCard = ({ onUpload }: { onUpload: (file: File) => void }) => {
  return (
    <label className="bg-white dark:bg-[#1A1A1A] border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group h-full min-h-[300px]">
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
      <div className="size-14 bg-muted dark:bg-[#222222] rounded-full flex items-center justify-center border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
        <Plus className="size-6 text-muted-foreground group-hover:text-primary transition-all" />
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-[16px]">New Resume</h3>
        <p className="text-muted-foreground text-[13px] max-w-[180px]">
          Create a tailored resume for your next big role.
        </p>
      </div>
    </label>
  );
};

export default function MyCV() {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: 1,
      title: "Senior Product Designer CV",
      date: "Oct 24, 2023",
      isPrimary: true,
      isDraft: false,
    },
    {
      id: 2,
      title: "UX Researcher CV - Ver. 2",
      date: "Nov 12, 2023",
      isPrimary: false,
      isDraft: true,
    },
  ]);

  const handleUpload = (file: File) => {
    const newResume: Resume = {
      id: Date.now(),
      title: file.name.replace(".pdf", ""),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      isPrimary: false,
      isDraft: false,
    };
    setResumes((prev) => [...prev, newResume]);
    toast.success(`"${file.name}" uploaded successfully!`);
  };

  const handleDelete = (id: number) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    toast.info("Resume deleted.");
  };

  const handleSetPrimary = (id: number) => {
    setResumes((prev) =>
      prev.map((r) => ({
        ...r,
        isPrimary: r.id === id,
      })),
    );
    toast.success("Primary resume updated!");
  };

  return (
    <div className="space-y-6">
      <DashboardTitle>My CV</DashboardTitle>
      <CommonWrapper className="p-7">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="h-full">
                <ResumeCard
                  resume={resume}
                  onDelete={handleDelete}
                  onSetPrimary={handleSetPrimary}
                />
              </div>
            ))}
            <div className="h-full">
              <UploadCard onUpload={handleUpload} />
            </div>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
