// Modular Components
import ApplicationTrendChart from "./charts/ApplicationTrendChart";
import ApplicantStatusChart from "./charts/ApplicantStatusChart";
import HiringFunnelChart from "./charts/HiringFunnelChart";
import TopJobsChart from "./charts/TopJobsChart";

// ─── Dummy Data ──────────────────────────────────────────────────
const applicationTrend = [
  { day: "Mon", applications: 14, views: 52 },
  { day: "Tue", applications: 22, views: 78 },
  { day: "Wed", applications: 18, views: 63 },
  { day: "Thu", applications: 35, views: 110 },
  { day: "Fri", applications: 28, views: 95 },
  { day: "Sat", applications: 42, views: 130 },
  { day: "Sun", applications: 31, views: 88 },
];

const topJobs = [
  { title: "Senior Engineer", applicants: 48 },
  { title: "Product Designer", applicants: 36 },
  { title: "React Developer", applicants: 29 },
  { title: "Data Analyst", applicants: 22 },
  { title: "Marketing Lead", applicants: 17 },
];

const statusBreakdown = [
  { name: "Pending", value: 54, fill: "#f59e0b" },
  { name: "Shortlisted", value: 28, fill: "#3b82f6" },
  { name: "Hired", value: 12, fill: "#10b981" },
  { name: "Rejected", value: 22, fill: "#ef4444" },
];

const hiringFunnel = [
  { stage: "Viewed", value: 520 },
  { stage: "Applied", value: 116 },
  { stage: "Shortlisted", value: 28 },
  { stage: "Interviewed", value: 14 },
  { stage: "Hired", value: 12 },
];
// ─────────────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.15 },
  }),
};

export function DashboardCharts() {
  return (
    <div className="space-y-8 mb-8">
      {/* Row 1: Application Volume vs. Job Views + Applicant Status */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <ApplicationTrendChart
          data={applicationTrend}
          variants={cardVariants}
        />
        <ApplicantStatusChart data={statusBreakdown} variants={cardVariants} />
      </div>

      {/* Row 2: Hiring Funnel + Top Performing Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HiringFunnelChart data={hiringFunnel} variants={cardVariants} />
        <TopJobsChart data={topJobs} variants={cardVariants} />
      </div>
    </div>
  );
}
