import { Share2, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StickyJobBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 rounded-3xl p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-700 shadow-inner">
              <img
                src="https://ui-avatars.com/api/?name=Senior+UI/UX+Designer&background=00b074&color=fff"
                alt="Logo"
                className="size-full object-contain"
              />
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-white leading-tight">
                Senior UI/UX Designer
              </h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Jobszilla • San Francisco
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-6">
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?u=${i}`}
                    alt="Avatar"
                    className="size-8 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"
                  />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-500">
                <span className="text-emerald-500 font-black">25+ people</span>{" "}
                applied lately
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-4 ml-auto">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  $12,000
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Monthly
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-11 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-95 shadow-sm bg-white dark:bg-slate-900"
                >
                  <Heart className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-11 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-95 shadow-sm bg-white dark:bg-slate-900"
                >
                  <Share2 className="size-5" />
                </Button>
                <Button className="bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white font-black px-6 h-11 rounded-2xl hover:scale-105 transition-all shadow-lg active:scale-95 hidden sm:flex">
                  <MessageSquare className="size-4 mr-2" />
                  Email Message
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 h-11 rounded-2xl shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all active:scale-95">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
