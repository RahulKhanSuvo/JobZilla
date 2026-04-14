import { AdminStatsGrid } from "./components/AdminStatsGrid";
import { RevenueGrowthChart } from "./components/RevenueGrowthChart";
import { PlatformAnalytics } from "./components/PlatformAnalytics";
import { RecentActivity } from "./components/RecentActivity";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Calendar } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            System Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Monitoring platform health and growth metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm font-bold flex items-center gap-2"
          >
            <Calendar className="size-4 text-slate-400" />
            Last 30 Days
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm size-10 p-0"
          >
            <RefreshCw className="size-4 text-slate-400" />
          </Button>
          <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 font-bold flex items-center gap-2 px-6">
            <Download className="size-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <AdminStatsGrid />

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RevenueGrowthChart />
        </div>
        <div className="xl:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Secondary Analytics */}
      <PlatformAnalytics />
    </div>
  );
}
