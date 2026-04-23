/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ApplicantStatusData {
  name: string;
  value: number;
  fill: string;
}

interface ApplicantStatusChartProps {
  data: ApplicantStatusData[] | undefined;
  variants: any;
}

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

export default function ApplicantStatusChart({
  data,
  variants,
}: ApplicantStatusChartProps) {
  return (
    <motion.div
      custom={2}
      variants={variants}
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
                  data={data}
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
                  {data?.map((entry, index) => (
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
            {data?.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full shrink-0"
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
  );
}
