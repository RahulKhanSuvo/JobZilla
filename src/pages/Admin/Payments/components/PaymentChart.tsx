/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { REVENUE_CHART_DATA } from "../types";

export default function PaymentChart() {
  return (
    <Card className="border-none shadow rounded overflow-hidden bg-white dark:bg-slate-900 mb-8">
      <CardHeader className="flex flex-row items-center justify-between pb-8 border-b border-slate-50 dark:border-slate-800 px-8">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <DollarSign className="size-5 text-primary" />
            Revenue Analysis
          </CardTitle>
          <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-wider">
            <TrendingUp className="size-4" />
            <span>Growth trend: High</span>
          </div>
        </div>
        <div className="text-[10px] font-bold text-muted-foreground bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase">
          Real-time Data
        </div>
      </CardHeader>
      <CardContent className="pt-8 px-8">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={REVENUE_CHART_DATA}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.2}
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
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  backgroundColor: "white",
                  fontSize: "12px",
                  fontWeight: "900",
                }}
                formatter={(value: any) => [
                  `$${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
                cursor={{ stroke: "var(--primary)", strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--primary)"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
