/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { IApplicationTrend } from "@/types/stats";

interface ApplicationTrendChartProps {
  data: IApplicationTrend[];
  variants: any;
}

export default function ApplicationTrendChart({
  data,
  variants,
}: ApplicationTrendChartProps) {
  return (
    <motion.div
      custom={1}
      variants={variants}
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
                data={data}
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
                  <linearGradient id="gradViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
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
  );
}
