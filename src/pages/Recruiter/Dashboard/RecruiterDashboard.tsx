import { DashboardHeader } from "./components/DashboardHeader";
import { StatsGrid } from "./components/StatsGrid";
import { DashboardCharts } from "./components/DashboardCharts";
import { RecentApplicants } from "./components/RecentApplicants";
import { useGetRecruiterDashboardStatsQuery } from "@/redux/features/recruiter/recruiterStats.api";

export default function RecruiterDashboard() {
  const {
    data: statsResponse,
    isLoading,
    isError,
  } = useGetRecruiterDashboardStatsQuery();

  if (isError) {
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

  const stats = statsResponse?.data;

  return (
    <>
      {/* Top Header Section */}
      <DashboardHeader />

      {/* Statistics Grid */}
      <StatsGrid stats={stats} isLoading={isLoading} />

      {/* Charts and Data Visualizations */}
      <DashboardCharts stats={stats} isLoading={isLoading} />

      {/* Tables and List Sections */}
      <RecentApplicants />
    </>
  );
}
