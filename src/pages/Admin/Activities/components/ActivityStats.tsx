import { Card, CardContent } from "@/components/ui/card";
import {
  Activity as ActivityIcon,
  AlertTriangle,
  ShieldX,
  Zap,
} from "lucide-react";
import type { Activity } from "../types";

interface ActivityStatsProps {
  activities: Activity[];
}

export default function ActivityStats({ activities }: ActivityStatsProps) {
  const totalActivities = activities.length;
  const warningCount = activities.filter(
    (a) => a.severity === "warning",
  ).length;
  const criticalErrors = activities.filter(
    (a) => a.severity === "critical" || a.severity === "error",
  ).length;

  // Find most active module
  const moduleCounts = activities.reduce(
    (acc, curr) => {
      acc[curr.module] = (acc[curr.module] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const mostActiveModule =
    Object.entries(moduleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const stats = [
    {
      title: "Recent Activities",
      value: totalActivities,
      icon: ActivityIcon,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "System Warnings",
      value: warningCount,
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      title: "Critical Issues",
      value: criticalErrors,
      icon: ShieldX,
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-950/30",
    },
    {
      title: "Most Active",
      value: mostActiveModule,
      icon: Zap,
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
                <h3 className="text-2xl font-bold mt-1 tracking-tight text-slate-900 dark:text-slate-100 italic md:not-italic">
                  {stat.value}
                </h3>
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
