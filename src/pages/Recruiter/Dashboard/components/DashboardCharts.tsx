import type { IRecruiterDashboardStats } from "@/types/stats";
import { ChartSkeleton } from "./charts/ChartSkeleton";
import ApplicationTrendChart from "./charts/ApplicationTrendChart";
import ApplicantStatusChart from "./charts/ApplicantStatusChart";
import HiringFunnelChart from "./charts/HiringFunnelChart";
import TopJobsChart from "./charts/TopJobsChart";

interface DashboardChartsProps {
  stats: IRecruiterDashboardStats | undefined;
  isLoading: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.15 },
  }),
};

export function DashboardCharts({ stats, isLoading }: DashboardChartsProps) {
  if (isLoading) {
    return (
      <div className="space-y-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <ChartSkeleton
            className="lg:col-span-3 h-full"
            customVariantIndex={1}
            variants={cardVariants}
          />
          <ChartSkeleton
            className="lg:col-span-2 h-full"
            customVariantIndex={2}
            variants={cardVariants}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartSkeleton
            className="h-full"
            customVariantIndex={3}
            variants={cardVariants}
          />
          <ChartSkeleton
            className="h-full"
            customVariantIndex={4}
            variants={cardVariants}
          />
        </div>
      </div>
    );
  }

  // ─── Data Mapping ───────────────────────────────────────────

  // 1. Application Trend
  // API returns { day, value }. Component expects { day, applications, views }
  const trendData = stats?.applicationTrend;
  // 2. Status Breakdown
  const statusBreakdown = [
    { name: "Pending", value: stats?.pendingApplicants || 0, fill: "#f59e0b" },
    {
      name: "Shortlisted",
      value: stats?.shortlistedApplicants || 0,
      fill: "#3b82f6",
    },
    { name: "Hired", value: stats?.hiredApplicants || 0, fill: "#10b981" },
    {
      name: "Rejected",
      value: stats?.rejectedApplicants || 0,
      fill: "#ef4444",
    },
  ];

  // 3. Hiring Funnel
  // Estimation based on available total stats
  const hiringFunnel = [
    { stage: "Viewed", value: stats?.totalViews || 0 },
    { stage: "Applied", value: stats?.totalApplicants || 0 },
    { stage: "Shortlisted", value: stats?.shortlistedApplicants || 0 },
    { stage: "Hired", value: stats?.hiredApplicants || 0 },
  ];

  // 4. Top Jobs
  const topJobsData = stats?.topJobs;

  // ─────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8 mb-8">
      {/* Row 1: Application Volume + Applicant Status */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <ApplicationTrendChart data={trendData || []} variants={cardVariants} />
        <ApplicantStatusChart
          data={statusBreakdown || []}
          variants={cardVariants}
        />
      </div>

      {/* Row 2: Hiring Funnel + Top Performing Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HiringFunnelChart data={hiringFunnel || []} variants={cardVariants} />
        <TopJobsChart data={topJobsData || []} variants={cardVariants} />
      </div>
    </div>
  );
}
