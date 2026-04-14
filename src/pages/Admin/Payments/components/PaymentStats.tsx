import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, AlertCircle, CreditCard } from "lucide-react";
import type { Payment } from "../types";

interface PaymentStatsProps {
  payments: Payment[];
}

export default function PaymentStats({ payments }: PaymentStatsProps) {
  const totalRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingRevenue = payments
    .filter((p) => p.status === "pending")
    .reduce((acc, p) => acc + p.amount, 0);

  const failedPayments = payments.filter((p) => p.status === "failed").length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
      description: "Lifetime earnings",
    },
    {
      title: "Monthly Target",
      value: "92%",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      description: "vs. previous month",
    },
    {
      title: "Pending Clearance",
      value: `$${pendingRevenue.toLocaleString()}`,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      description: "Transactions awaiting approval",
    },
    {
      title: "Failed Payments",
      value: failedPayments.toString(),
      icon: CreditCard,
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-950/30",
      description: "Declined transactions",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="border-none shadow rounded overflow-hidden bg-white dark:bg-slate-900"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                Stats
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground truncate">
                {stat.title}
              </p>
              <h3 className="text-2xl font-black mt-1 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1">
                {stat.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
