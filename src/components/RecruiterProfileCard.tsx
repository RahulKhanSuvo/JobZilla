import { Pencil, Building2 } from "lucide-react";

export function RecruiterProfileCard() {
  return (
    <div className="mx-2 mb-6 p-4 bg-[#f0f9ff] rounded-2xl relative border border-blue-100 shadow-sm transition-all hover:shadow-md">
      {/* Edit Icon */}
      <button className="absolute top-3 right-3 p-1 rounded-full hover:bg-blue-200 transition-colors text-blue-400">
        <Pencil className="size-3" />
      </button>

      <div className="flex flex-col items-center gap-3">
        {/* Company Logo Container */}
        <div className="relative">
          <div className="size-16 rounded-full border-2 border-white shadow-sm overflow-hidden bg-white flex items-center justify-center">
            <Building2 className="size-10 text-[#004a8c]" />
          </div>
          {/* Status Indicator */}
          <div className="absolute bottom-0 right-1 size-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
        </div>

        {/* Recruiter Info */}
        <div className="text-center space-y-2">
          <h3 className="font-bold text-[#1e293b] text-base tracking-tight leading-tight">
            Acme Corporation
          </h3>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#004a8c] text-white text-[10px] font-bold tracking-wide shadow-sm active:scale-95 transition-transform cursor-pointer">
            Hiring Manager
          </div>
        </div>
      </div>
    </div>
  );
}
