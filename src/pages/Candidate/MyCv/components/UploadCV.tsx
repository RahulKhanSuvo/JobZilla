import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UploadCVProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

const UploadCV = ({ onUpload, isUploading }: UploadCVProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    onUpload(file);
  };

  return (
    <label className="bg-white dark:bg-[#1A1A1A] border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group h-full min-h-[300px]">
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />

      <div className="size-14 bg-muted dark:bg-[#222222] rounded-full flex items-center justify-center border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
        {isUploading ? (
          <Loader2 className="size-6 text-primary animate-spin" />
        ) : (
          <Plus className="size-6 text-muted-foreground group-hover:text-primary transition-all" />
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-[16px]">
          {isUploading ? "Uploading..." : "New Resume"}
        </h3>
        <p className="text-muted-foreground text-[13px] max-w-[180px]">
          {isUploading
            ? "Please wait while we secure your file in the cloud."
            : "Upload your PDF resume to start applying for jobs."}
        </p>
      </div>
    </label>
  );
};

export default UploadCV;
