import StatsOverview from "./components/StatsOverview";
import RecentApplications from "./components/RecentApplications";
import ProfileCompleteness from "./components/ProfileCompleteness";
import RecommendedJobs from "./components/RecommendedJobs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
import { useGetCandidateDashboardStatsQuery } from "@/redux/features/allStats/stats.api";
import StatsCardSkeleton from "@/components/common/StatsCardSkeleton";

export default function CandidateDashboard() {
  const { data: user } = useCurrentUserQuery();
  const { data: stats, isLoading } = useGetCandidateDashboardStatsQuery();
  const userName = user?.data?.name || "Candidate";
  console.log(stats)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, <span className="text-primary">{userName}!</span> 👋
          </h1>
          <p className="text-muted-foreground">
            You have{" "}
            <span className="text-foreground font-semibold">
              2 new messages
            </span>{" "}
            and{" "}
            <span className="text-foreground font-semibold">
              4 new job matches
            </span>{" "}
            today.
          </p>
        </div>

        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs, companies..."
            className="pl-9 bg-white dark:bg-slate-900 border-none shadow-sm h-11"
          />
        </div>
      </div>

      {/* Stats Cards */}

      {
        isLoading ? <StatsCardSkeleton count={4} /> : <StatsOverview stats={stats?.data ?? {
          totalApplications: 0,
          totalSavedJobs: 0,
          totalViews: 0,
          totlaShortListedJobs: 0,
        }} />
      }


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <RecentApplications />
          <RecommendedJobs />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <ProfileCompleteness />

          {/* Quick Tip / CTA Card */}
          <div className="bg-primary rounded-2xl p-6 text-primary-foreground space-y-4 shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 size-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -right-4 -top-4 size-24 bg-white/10 rounded-full blur-xl" />

            <h3 className="text-xl font-bold">Level up your search! 🚀</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Candidates who apply within the first 48 hours are 3x more likely
              to get hired. Turn on instant alerts.
            </p>
            <button className="bg-white text-primary font-bold py-2.5 px-5 rounded text-sm hover:bg-opacity-90 transition-all shadow-sm">
              Enable Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
