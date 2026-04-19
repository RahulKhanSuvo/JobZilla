import { DashboardHeader } from "./components/DashboardHeader";
import { StatsGrid } from "./components/StatsGrid";
import { DashboardCharts } from "./components/DashboardCharts";
import { RecentApplicants } from "./components/RecentApplicants";
import { useGetJobStatsQuery } from "@/redux/features/allStats/stats.api";
import JobzillaLoading from "@/components/common/JobzillaLoading";

export default function RecruiterDashboard() {
  const { data: statsResponse, isLoading, isError } = useGetJobStatsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <JobzillaLoading />
      </div>
    );
  }

  if (isError || !statsResponse) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Failed to load dashboard
        </h2>
        <p className="text-slate-500">
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
      </div>
    );
  }

  const stats = statsResponse.data;

  const pipelineData = [
    { stage: "Applied", value: stats.totalApplicants, color: "var(--primary)" },
    {
      stage: "Shortlisted",
      value: stats.shortlistedApplicants,
      color: "var(--primary)",
    },
    { stage: "Hired", value: stats.hiredApplicants, color: "var(--primary)" },
    {
      stage: "Rejected",
      value: stats.rejectedApplicants,
      color: "var(--primary)",
    },
  ];

  return (
    <>
      <div className="max-w-[1600px] mx-auto">
        {/* Top Header Section */}
        <DashboardHeader />

        {/* Statistics Grid */}
        <StatsGrid stats={stats} />

        {/* Charts and Data Visualizations */}
        <DashboardCharts
          trendData={stats.applicationTrend}
          pipelineData={pipelineData}
        />

        {/* Tables and List Sections */}
        <RecentApplicants applicants={stats.recentApplicants} />
      </div>
    </>
  );
}
