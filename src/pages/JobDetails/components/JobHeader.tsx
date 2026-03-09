import {
  MapPin,
  Calendar,
  Share2,
  Heart,
  Send,
  Star,
  CircleDollarSign,
  CircleCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import demoImage from "@assets/logos/profile-1.jpg";

export default function JobHeader() {
  return (
    <div className="bg-white dark:bg-slate-900 py-12 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        {/* Left: Company Logo & Job Title */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="size-28 rounded-3xl bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm p-4 shrink-0 transition-all hover:shadow-md">
            <img
              src={demoImage}
              alt="Rockstar Games New York"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-3">
            <p className="text-[#059669]  text-base tracking-wide uppercase">
              Rockstar Games New York
            </p>
            <h1 className="text-3xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight flex flex-wrap items-center gap-3">
              Senior UI/UX Designer
              <CircleCheck className="size-7 text-[#4F46E5] fill-[#4F46E5]/10 shrink-0" />
            </h1>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-500 dark:text-slate-400 font-semibold text-[15px] pt-1">
              <span className="flex items-center gap-2">
                <MapPin className="size-5 text-slate-300 dark:text-slate-600" />
                Las Vegas, NV 89107, USA
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="size-5 text-slate-300 dark:text-slate-600" />
                2 days ago
              </span>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <span className="px-5 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-bold text-sm tracking-tight border border-slate-200/50 dark:border-slate-700/50">
                Full-time
              </span>
              <span className="px-5 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-bold text-sm tracking-tight border border-slate-200/50 dark:border-slate-700/50">
                Remote
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions, Rating & Salary */}
        <div className="flex flex-col items-start lg:items-end gap-6 min-w-max">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="size-12 rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 shadow-sm transition-all active:scale-95"
            >
              <Share2 className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-12 rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 shadow-sm transition-all active:scale-95"
            >
              <Heart className="size-5" />
            </Button>
            <Button className="h-14 px-10 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-black text-lg gap-3 shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
              <Send className="size-5 rotate-[-20deg]" />
              Apply Now
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-slate-400 dark:text-slate-500 text-sm font-semibold tracking-tight">
              32 days left to apply
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="size-4 fill-[#F59E0B] text-[#F59E0B]"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <div className="size-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CircleDollarSign className="size-6 text-[#10b981]" />
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              $83,000 - $110,000
              <span className="text-base text-slate-400 dark:text-slate-500 font-bold tracking-normal ml-2">
                /year
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
