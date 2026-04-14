import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
} from "recharts";

// Dummy data for application trend
const trendData = [
  { day: "Mon", value: 35 },
  { day: "Tue", value: 48 },
  { day: "Wed", value: 42 },
  { day: "Thu", value: 65 },
  { day: "Fri", value: 58 },
  { day: "Sat", value: 75 },
  { day: "Sun", value: 68 },
];

// Dummy data for pipeline
const pipelineData = [
  { stage: "Applied", value: 1240, color: "var(--primary)" },
  { stage: "Screened", value: 450, color: "var(--primary)" },
  { stage: "Interview", value: 120, color: "var(--primary)" },
  { stage: "Offer", value: 24, color: "var(--primary)" },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 font-sans">
      {/* Application Trend Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-none shadow rounded overflow-hidden bg-white dark:bg-slate-900 h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-8 border-b border-slate-50 dark:border-slate-800">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">
                Application Volume
              </CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-lato">
                Activity over the last 7 days
              </p>
            </div>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <MoreHorizontal className="size-5" />
            </button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--primary)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(0,0,0,0.05)"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                    dy={10}
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
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      backgroundColor: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                    cursor={{ stroke: "var(--primary)", strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Hiring Funnel / Pipeline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-none shadow rounded overflow-hidden bg-white dark:bg-slate-900 border-l-4 border-l-primary h-full">
          <CardHeader className="pb-8 border-b border-slate-50 dark:border-slate-800">
            <CardTitle className="text-xl font-bold">Hiring Pipeline</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-lato">
              Current recruitment status
            </p>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pipelineData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="stage"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fontWeight: 700,
                      fill: "currentColor",
                    }}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                    {pipelineData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill="var(--primary)"
                        fillOpacity={1 - index * 0.2}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ArrowUpRight className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">
                      Growth Rate
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      +8.2% this week
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs font-bold border-slate-200 dark:border-slate-700"
                >
                  Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
