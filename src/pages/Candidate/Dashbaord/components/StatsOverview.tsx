import { Card, CardContent } from "@/components/ui/card";
import type { CandidateDashboardStats } from "@/redux/features/allStats/stats.type";
import { Briefcase, Eye, Bookmark, CheckCircle } from "lucide-react";



export default function StatsOverview({ stats }: { stats: CandidateDashboardStats }) {
  const statsData = [
    {
      title: "Total Applied",
      value: stats?.totalApplications,
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Shortlisted",
      value: stats?.totlaShortListedJobs,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Profile Views",
      value: stats?.totalViews,
      icon: Eye,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Saved Jobs",
      value: stats?.totalSavedJobs,
      icon: Bookmark,
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm dark:bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div
                className={`flex items-center justify-center size-12 rounded ${stat.bg}`}
              >
                <stat.icon className={`size-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
