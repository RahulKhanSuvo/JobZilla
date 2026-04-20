/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TopJobsData {
  title: string;
  applicants: number;
}

interface TopJobsChartProps {
  data: TopJobsData[];
  variants: any;
}

export default function TopJobsChart({ data, variants }: TopJobsChartProps) {
  return (
    <motion.div
      custom={4}
      variants={variants}
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
                data={data}
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
                  {data.map((_entry, index) => (
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
  );
}
