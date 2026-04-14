import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle, Star } from "lucide-react";
import type { AdminJob } from "../types";

interface JobStatsProps {
  jobs: AdminJob[];
}

export default function JobStats({ jobs }: JobStatsProps) {
  const totalJobs = jobs.length;
  const pendingJobs = jobs.filter((j) => j.status === "PENDING").length;
  const activeJobs = jobs.filter((j) => j.status === "APPROVED").length;
  const featuredJobs = jobs.filter((j) => j.isFeatured).length;

  const stats = [
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Pending Approval",
      value: pendingJobs,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "Featured Jobs",
      value: featuredJobs,
      icon: Star,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="border-none shadow-sm overflow-hidden"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground truncate">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
