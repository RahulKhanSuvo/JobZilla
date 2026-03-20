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
import Container from "@/components/common/Container";

export default function JobHeader() {
  return (
    <div className="bg-white sticky top-20 z-20 dark:bg-slate-900">
      <Container className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 border-b border-slate-200 dark:border-slate-800 transition-colors py-8">
        {/* Left: Company Logo & Job Title */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="size-24 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 transition-all">
            <img
              src={demoImage}
              alt="Rockstar Games New York"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-1">
            <p className="text-[#059669] text-sm font-semibold tracking-wide">
              Rockstar Games New York
            </p>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight flex flex-wrap items-center gap-3">
              Senior UI/UX Designer
              <CircleCheck className="size-7 text-[#4F46E5] fill-[#4F46E5]/10 shrink-0" />
            </h1>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-slate-500 dark:text-slate-400  text-[15px] pt-1">
              <span className="flex items-center gap-2">
                <MapPin className="size-5 text-slate-300 dark:text-slate-600" />
                Las Vegas, NV 89107, USA
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="size-5 text-slate-300 dark:text-slate-600" />
                2 days ago
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-medium text-xs tracking-tight border border-slate-200/50 dark:border-slate-700/50">
                Full-time
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions, Rating & Salary */}
        <div className="flex flex-col items-start lg:items-end gap-2 min-w-max">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 transition-all active:scale-95"
            >
              <Share2 className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 transition-all active:scale-95"
            >
              <Heart className="size-5" />
            </Button>
            <Button className="h-12 px-20 py-4 rounded bg-[#10b981] hover:bg-[#059669] text-white  gap-3 transition-all active:scale-95">
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

          <div className="flex items-center gap-3">
            <div className=" rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CircleDollarSign className=" text-[#10b981]" />
            </div>
            <p className="text-sm font-semibold  dark:text-white tracking-tighter">
              $83,000 - $110,000
              <span className="text-base text-slate-400 dark:text-slate-500 font-bold tracking-normal ml-2">
                /year
              </span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
