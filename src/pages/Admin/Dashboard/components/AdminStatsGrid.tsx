import {
  DollarSign,
  Users,
  Briefcase,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Monthly Revenue",
    value: "$42,500",
    trend: "+12.5%",
    isUp: true,
    icon: DollarSign,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Users",
    value: "15,840",
    trend: "+8.2%",
    isUp: true,
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Active Jobs",
    value: "3,420",
    trend: "+5.4%",
    isUp: true,
    icon: Briefcase,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Pending Reviews",
    value: "28",
    trend: "-15%",
    isUp: false,
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
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

export function AdminStatsGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={item}>
          <Card className="border-none shadow hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
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
                      : "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
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
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">
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
