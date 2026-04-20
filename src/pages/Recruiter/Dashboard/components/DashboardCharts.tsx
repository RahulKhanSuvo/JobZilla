import type { IRecruiterDashboardStats } from "@/types/stats";
import ApplicationTrendChart from "./charts/ApplicationTrendChart";
import ApplicantStatusChart from "./charts/ApplicantStatusChart";
import HiringFunnelChart from "./charts/HiringFunnelChart";
import TopJobsChart from "./charts/TopJobsChart";

interface DashboardChartsProps {
  stats: IRecruiterDashboardStats;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.15 },
  }),
};

export function DashboardCharts({ stats }: DashboardChartsProps) {
  // ─── Data Mapping ───────────────────────────────────────────

  // 1. Application Trend
  // API returns { day, value }. Component expects { day, applications, views }
  const trendData = stats.applicationTrend;
  // 2. Status Breakdown
  const statusBreakdown = [
    { name: "Pending", value: stats.pendingApplicants, fill: "#f59e0b" },
    {
      name: "Shortlisted",
      value: stats.shortlistedApplicants,
      fill: "#3b82f6",
    },
    { name: "Hired", value: stats.hiredApplicants, fill: "#10b981" },
    { name: "Rejected", value: stats.rejectedApplicants, fill: "#ef4444" },
  ];

  // 3. Hiring Funnel
  // Estimation based on available total stats
  const hiringFunnel = [
    { stage: "Viewed", value: stats.totalViews },
    { stage: "Applied", value: stats.totalApplicants },
    { stage: "Shortlisted", value: stats.shortlistedApplicants },
    { stage: "Hired", value: stats.hiredApplicants },
  ];

  // 4. Top Jobs
  const topJobsData = stats.topJobs;

  // ─────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8 mb-8">
      {/* Row 1: Application Volume + Applicant Status */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <ApplicationTrendChart data={trendData} variants={cardVariants} />
        <ApplicantStatusChart data={statusBreakdown} variants={cardVariants} />
      </div>

      {/* Row 2: Hiring Funnel + Top Performing Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HiringFunnelChart data={hiringFunnel} variants={cardVariants} />
        <TopJobsChart data={topJobsData} variants={cardVariants} />
      </div>
    </div>
  );
}
