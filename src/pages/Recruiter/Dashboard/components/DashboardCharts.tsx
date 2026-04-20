/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Briefcase, Target } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

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

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  if (percent < 0.08) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={700}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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
      {/* Row 1: Application Trend + Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Application Trend - Wide */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-3 h-full"
        >
          <Card className="border-none shadow rounded overflow-hidden bg-white dark:bg-slate-900 h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-50 dark:border-slate-800">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <TrendingUp className="size-4 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold">
                    Application Volume vs. Job Views
                  </CardTitle>
                </div>
                <p className="text-xs text-slate-500 pl-9">
                  Last 7 days — how many people saw and applied
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={applicationTrend}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="gradApplications"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--primary)"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--primary)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradViews"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#94a3b8"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#94a3b8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(0,0,0,0.04)"
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                      dy={8}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                      cursor={{
                        stroke: "var(--primary)",
                        strokeWidth: 1,
                        strokeDasharray: "4 4",
                      }}
                    />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{
                        fontSize: "11px",
                        fontWeight: 700,
                        paddingTop: "16px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      name="Job Views"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      fill="url(#gradViews)"
                      animationDuration={1200}
                      dot={false}
                    />
                    <Area
                      type="monotone"
                      dataKey="applications"
                      name="Applications"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      fill="url(#gradApplications)"
                      animationDuration={1500}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applicant Status Donut */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-2 h-full"
        >
          <Card className="border-none shadow rounded overflow-hidden bg-white dark:bg-slate-900 h-full">
            <CardHeader className="pb-4 border-b border-slate-50 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Users className="size-4 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">
                    Applicant Status
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Snapshot of your current pipeline
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                      labelLine={false}
                      label={renderCustomLabel}
                      animationBegin={0}
                      animationDuration={1200}
                    >
                      {statusBreakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                          stroke="transparent"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full mt-2">
                {statusBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full flex-shrink-0"
                      style={{ background: item.fill }}
                    />
                    <span className="text-xs font-semibold text-slate-600">
                      {item.name}
                    </span>
                    <span className="text-xs font-bold ml-auto text-slate-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Row 2: Hiring Funnel + Top Performing Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hiring Funnel */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="h-full"
        >
          <Card className="border-none shadow rounded overflow-hidden bg-white dark:bg-slate-900 h-full">
            <CardHeader className="pb-4 border-b border-slate-50 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                  <Target className="size-4 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">
                    Hiring Funnel
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Conversion at each stage of recruitment
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={hiringFunnel}
                    layout="vertical"
                    margin={{ top: 0, right: 20, left: 50, bottom: 0 }}
                    barCategoryGap="30%"
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="stage"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fontWeight: 700, fill: "#64748b" }}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(0,0,0,0.03)" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      name="Candidates"
                      radius={[0, 6, 6, 0]}
                      barSize={28}
                    >
                      {hiringFunnel.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill="var(--primary)"
                          fillOpacity={Math.max(0.3, 1 - index * 0.16)}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Conversion Rate Badge */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Overall Conversion
                </p>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  {((12 / 520) * 100).toFixed(1)}% (View → Hire)
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Performing Jobs */}
        <motion.div
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="h-full"
        >
          <Card className="border-none shadow rounded overflow-hidden bg-white dark:bg-slate-900 h-full">
            <CardHeader className="pb-4 border-b border-slate-50 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 rounded-lg">
                  <Briefcase className="size-4 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">
                    Top Performing Jobs
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your most-applied-to positions
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topJobs}
                    margin={{ top: 5, right: 10, left: -25, bottom: 20 }}
                    barCategoryGap="30%"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(0,0,0,0.04)"
                    />
                    <XAxis
                      dataKey="title"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 9, fontWeight: 700, fill: "#94a3b8" }}
                      angle={-20}
                      textAnchor="end"
                      dy={8}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(0,0,0,0.03)" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                    <Bar
                      dataKey="applicants"
                      name="Applicants"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={48}
                    >
                      {topJobs.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? "#f59e0b" : "var(--primary)"}
                          fillOpacity={index === 0 ? 1 : 0.7}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
