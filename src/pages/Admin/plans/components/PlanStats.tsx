import { Card, CardContent } from "@/components/ui/card";
import { Layers, CheckCircle2, XCircle, TrendingUp } from "lucide-react";
import type { Plan } from "../types";

interface PlanStatsProps {
  plans: Plan[];
}

export default function PlanStats({ plans }: PlanStatsProps) {
  const totalPlans = plans.length;
  const activePlans = plans.filter((p) => p.status === "active").length;
  const inactivePlans = totalPlans - activePlans;
  const mostExpensive = plans.reduce(
    (max, p) => (p.price > max ? p.price : max),
    0,
  );

  const stats = [
    {
      label: "Total Plans",
      value: totalPlans,
      icon: Layers,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      label: "Active Plans",
      value: activePlans,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/20",
    },
    {
      label: "Inactive Plans",
      value: inactivePlans,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-950/20",
    },
    {
      label: "Highest Price",
      value: `$${mostExpensive}`,
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
