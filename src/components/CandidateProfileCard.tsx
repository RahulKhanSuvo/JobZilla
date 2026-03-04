import { Pencil } from "lucide-react";

export function CandidateProfileCard() {
  return (
    <div className="mx-2 mb-6 p-4 bg-[#f8fafc] rounded-2xl relative border border-slate-100/50 shadow-sm transition-all hover:shadow-md">
      {/* Edit Icon */}
      <button className="absolute top-3 right-3 p-1 rounded-full hover:bg-slate-200 transition-colors text-slate-400">
        <Pencil className="size-3" />
      </button>

      <div className="flex flex-col items-center gap-3">
        {/* Avatar Container */}
        <div className="relative">
          <div className="size-16 rounded-full border-2 border-white shadow-sm overflow-hidden">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-nerd-cartoon-illustration_23-2150699049.jpg"
              alt="Profile"
              className="size-full object-cover"
            />
          </div>
          {/* Online Indicator */}
          <div className="absolute bottom-0 right-1 size-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
        </div>

        {/* User Info */}
        <div className="text-center space-y-2">
          <h3 className="font-bold text-[#1e293b] text-base tracking-tight leading-tight">
            Md. Rahul Khan Suvo
          </h3>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#004a8c] text-white text-[10px] font-bold tracking-wide shadow-sm active:scale-95 transition-transform cursor-pointer">
            98% Profile Complete
          </div>
        </div>
      </div>
    </div>
  );
}
