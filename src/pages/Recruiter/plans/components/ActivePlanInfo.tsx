import { Progress } from "@/components/ui/progress";
import { Calendar, Briefcase, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ActivePlanInfoProps {
  plan: {
    name: string;
    expiryDate: string;
    usage: {
      jobsPosted: number;
      jobsLimit: number;
    };
  };
}

export function ActivePlanInfo({ plan }: ActivePlanInfoProps) {
  const percentage = (plan.usage.jobsPosted / plan.usage.jobsLimit) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-2xl p-8 mb-12 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4 max-w-md">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="size-5 fill-primary" />
            <span className="font-bold uppercase tracking-wider text-xs">
              Direct Summary
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            You are currently on the{" "}
            <span className="text-primary italic">{plan.name} Plan</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Your plan will renew on{" "}
            <span className="text-slate-900">
              {new Date(plan.expiryDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            .
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Briefcase className="size-5 text-primary" />
                </div>
                <span className="font-bold text-slate-700">Jobs Usage</span>
              </div>
              <span className="text-sm font-bold text-slate-900">
                {plan.usage.jobsPosted} / {plan.usage.jobsLimit}
              </span>
            </div>
            <div className="space-y-2">
              <Progress value={percentage} className="h-2" />
              <p className="text-[11px] text-slate-400 font-medium text-right">
                {plan.usage.jobsLimit - plan.usage.jobsPosted} posts remaining
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Calendar className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                Renewal Date
              </p>
              <p className="text-sm font-bold text-slate-900">May 20, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
