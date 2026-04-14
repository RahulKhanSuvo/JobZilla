import { DashboardHeader } from "./components/DashboardHeader";
import { StatsGrid } from "./components/StatsGrid";
import { DashboardCharts } from "./components/DashboardCharts";
import { RecentApplicants } from "./components/RecentApplicants";

export default function RecruiterDashboard() {
  return (
    <div className="min-h-screen bg-background/50 p-6 lg:p-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Header Section */}
        <DashboardHeader />

        {/* Statistics Grid */}
        <StatsGrid />

        {/* Charts and Data Visualizations */}
        <DashboardCharts />

        {/* Tables and List Sections */}
        <RecentApplicants />
      </div>
    </div>
  );
}
