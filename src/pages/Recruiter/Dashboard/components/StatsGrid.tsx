import { Briefcase, Users, UserCheck, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { IRecruiterDashboardStats } from "@/types/stats";

interface StatsGridProps {
  stats?: IRecruiterDashboardStats;
  isLoading: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function StatsGrid({ stats, isLoading }: StatsGridProps) {
  const displayStats = [
    {
      title: "Active Jobs",
      value: stats?.openJobs.toString() || "0",
      icon: Briefcase,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Applicants",
      value: stats?.totalApplicants.toLocaleString() || "0",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Shortlisted",
      value: stats?.shortlistedApplicants.toString() || "0",
      icon: UserCheck,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Total Hired",
      value: stats?.hiredApplicants.toString() || "0",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <motion.div key={`skeleton-${index}`} variants={item}>
              <Card className="border-none shadow hover:shadow-sm transition-shadow duration-300 rounded overflow-hidden bg-white dark:bg-slate-900">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-12 w-12 rounded" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        : displayStats.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border-none shadow hover:shadow-sm transition-shadow duration-300 rounded overflow-hidden bg-white dark:bg-slate-900">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded", stat.bgColor)}>
                      <stat.icon className={cn("size-6", stat.color)} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
    </motion.div>
  );
}
