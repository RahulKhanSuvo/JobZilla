/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetResumesQuery } from "@/redux/features/candidate/resume.api";
import { toast } from "sonner";
import { FileText, Upload, Loader2, Send } from "lucide-react";
import { errorToast } from "@/utils/errorToast";
import { useApplyJobMutation } from "@/redux/features/recruiter/application.api";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
}

export default function ApplyModal({
  isOpen,
  onClose,
  jobId,
  jobTitle,
}: ApplyModalProps) {
  const { data: resumesData, isLoading: isResumesLoading } =
    useGetResumesQuery();
  const [applyJob, { isLoading: isApplying }] = useApplyJobMutation();

  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const resumes = resumesData?.data || [];

  const handleApply = async () => {
    if (!selectedResumeId && !file) {
      toast.error("Please select a resume or upload a new one");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("jobId", jobId);

      if (file) {
        formData.append("file", file);
      } else if (selectedResumeId) {
        formData.append("resumeId", selectedResumeId);
      }

      await applyJob(formData).unwrap();
      toast.success("Application submitted successfully!");
      onClose();
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Apply for <span className="text-[#10b981]">{jobTitle}</span>
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400 mt-1">
            Choose how you want to submit your application.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Option 1: Select Existing Resume */}
          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <FileText className="size-4 text-[#10b981]" />
              Select Existing Resume
            </Label>
            <Select
              value={selectedResumeId}
              onValueChange={(value) => {
                setSelectedResumeId(value);
                setFile(null); // Clear file if selecting existing
              }}
              disabled={isResumesLoading || !!file}
            >
              <SelectTrigger className="w-full h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-[#10b981]/20">
                <SelectValue
                  placeholder={
                    isResumesLoading ? "Loading resumes..." : "Select a resume"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {resumes.map((resume: any) => (
                  <SelectItem key={resume.id} value={resume.id}>
                    {resume.title} {resume.isPrimary && "(Primary)"}
                  </SelectItem>
                ))}
                {resumes.length === 0 && !isResumesLoading && (
                  <div className="p-2 text-sm text-slate-500 text-center">
                    No resumes found
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-bold">
                Or
              </span>
            </div>
          </div>

          {/* Option 2: Upload New Resume */}
          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Upload className="size-4 text-[#10b981]" />
              Upload New Resume
            </Label>
            <div className="grid w-full items-center gap-1.5">
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setSelectedResumeId(""); // Clear selection if uploading
                }}
                className="h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 file:text-[#10b981] file:font-semibold"
                disabled={!!selectedResumeId}
              />
              <p className="text-[11px] text-slate-400 font-medium ml-1">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-12 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={isApplying || (!selectedResumeId && !file)}
            className="flex-1 h-12 bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
            {isApplying ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Send className="size-5" />
            )}
            {isApplying ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
