/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface HiringFunnelData {
  stage: string;
  value: number;
}

interface HiringFunnelChartProps {
  data: HiringFunnelData[] | undefined;
  variants: any;
}

export default function HiringFunnelChart({
  data,
  variants,
}: HiringFunnelChartProps) {
  // Simple conversion calculation (Stage 1 to Last Stage)
  const views = data?.[0]?.value || 0;
  const hires = data?.[data.length - 1]?.value || 0;
  const conversionRate = views > 0 ? ((hires / views) * 100).toFixed(1) : "0.0";

  return (
    <motion.div
      custom={3}
      variants={variants}
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
              <CardTitle className="text-lg font-bold">Hiring Funnel</CardTitle>
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
                data={data}
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
                  {data?.map((_entry, index) => (
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
              {conversionRate}% (View → Hire)
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
