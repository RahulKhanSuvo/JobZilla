import {
  Briefcase,
  Users,
  UserCheck,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Active Jobs",
    value: "24",
    trend: "+12%",
    isUp: true,
    icon: Briefcase,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Applicants",
    value: "1,240",
    trend: "+15%",
    isUp: true,
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Shortlisted",
    value: "85",
    trend: "+8%",
    isUp: true,
    icon: UserCheck,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Hired",
    value: "12",
    trend: "-2%",
    isUp: false,
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
  },
];

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

export function StatsGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={item}>
          <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                  <stat.icon className={cn("size-6", stat.color)} />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
                    stat.isUp
                      ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                      : "text-red-600 bg-red-50 dark:bg-red-900/20",
                  )}
                >
                  {stat.isUp ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                  {stat.trend}
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
