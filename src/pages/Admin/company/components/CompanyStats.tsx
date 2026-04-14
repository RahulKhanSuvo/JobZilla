import { Card, CardContent } from "@/components/ui/card";
import { Building2, CheckCircle, AlertCircle, Briefcase } from "lucide-react";
import type { Company } from "../types";

interface CompanyStatsProps {
  companies: Company[];
}

export default function CompanyStats({ companies }: CompanyStatsProps) {
  const totalCompanies = companies.length;
  const verifiedCompanies = companies.filter((c) => c.isVerified).length;
  const suspendedCompanies = companies.filter(
    (c) => c.status === "suspended",
  ).length;
  const totalJobsPosted = companies.reduce((acc, c) => acc + c.totalJobs, 0);

  const stats = [
    {
      title: "Total Companies",
      value: totalCompanies,
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Verified Employers",
      value: verifiedCompanies,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "Suspended",
      value: suspendedCompanies,
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-950/30",
    },
    {
      title: "Total Jobs Posted",
      value: totalJobsPosted,
      icon: Briefcase,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="border-none shadow-sm rounded overflow-hidden"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground truncate">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
