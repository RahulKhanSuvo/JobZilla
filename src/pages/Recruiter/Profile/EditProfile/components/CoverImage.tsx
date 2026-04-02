import CommonWrapper from "@/components/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon } from "lucide-react";

interface CoverImageProps {
  coverPreview: string | null;
  logoPreview: string | null;
  handleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  employerName: string;
}

export default function CoverImage({
  coverPreview,
  logoPreview,
  handleCoverChange,
  handleLogoChange,
  employerName,
}: CoverImageProps) {
  return (
    <CommonWrapper className="p-0 overflow-hidden">
      <div className="relative">
        {/* Cover Upload Container */}
        <div className="group relative h-48 md:h-64 w-full bg-slate-100 border-b border-border transition-all">
          {coverPreview ? (
            <img
              src={coverPreview}
              alt="Cover"
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full flex items-center justify-center">
              <ImageIcon className="size-12 text-muted-foreground/30" />
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => document.getElementById("cover-upload")?.click()}
            className="absolute bottom-4 right-4 gap-2 shadow rounded bg-white hover:bg-slate-50 text-slate-900 border-none z-10"
          >
            <Camera className="size-4" />
            <span className="hidden sm:inline">Edit Cover Photo</span>
          </Button>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="hidden"
          />
        </div>

        {/* Logo Upload Container (Overlapping) */}
        <div className="px-8 pb-4 pointer-events-none">
          <div className="relative -mt-16 sm:-mt-20 flex flex-col items-start gap-4 pointer-events-auto w-fit">
            <div className="group relative size-28 sm:size-36 rounded overflow-hidden border-4 border-white shadow bg-white shrink-0">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full flex items-center justify-center bg-slate-50">
                  <ImageIcon className="size-10 text-muted-foreground/30" />
                </div>
              )}

              {/* Logo Edit Overlay */}
              <button
                type="button"
                onClick={() => document.getElementById("logo-upload")?.click()}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <div className="size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/40">
                  <Camera className="size-5" />
                </div>
              </button>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </div>

            <div className="flex-1 space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {employerName || "Company Name"}
              </h2>
              <p className="text-sm text-muted-foreground">
                PNG, JPG or JPEG. Max size 2MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
}
