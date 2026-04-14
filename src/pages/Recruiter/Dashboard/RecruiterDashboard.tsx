import { DashboardHeader } from "./components/DashboardHeader";
import { StatsGrid } from "./components/StatsGrid";
import { DashboardCharts } from "./components/DashboardCharts";
import { RecentApplicants } from "./components/RecentApplicants";

export default function RecruiterDashboard() {
  return (
    <div>
      <div>
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
