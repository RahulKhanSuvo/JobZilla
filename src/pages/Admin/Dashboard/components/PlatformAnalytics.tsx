import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const userData = [
  { name: "Candidates", value: 12400, color: "var(--primary)" },
  { name: "Employers", value: 3440, color: "#4ade80" },
];

const categoryData = [
  { name: "IT", value: 45, color: "var(--primary)" },
  { name: "Sales", value: 25, color: "#60a5fa" },
  { name: "Design", value: 20, color: "#f59e0b" },
  { name: "Other", value: 10, color: "#94a3b8" },
];

export function PlatformAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* User Distribution */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-none shadow rounded-xl overflow-hidden bg-white dark:bg-slate-900 h-[400px]">
          <CardHeader className="pb-2 border-b border-slate-50 dark:border-slate-800">
            <CardTitle className="text-xl font-bold">
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {userData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      fontWeight: "bold",
                    }}
                    itemStyle={{ fontSize: "12px" }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Job Distribution */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-none shadow rounded-xl overflow-hidden bg-white dark:bg-slate-900 h-[400px]">
          <CardHeader className="pb-2 border-b border-slate-50 dark:border-slate-800">
            <CardTitle className="text-xl font-bold">
              Jobs by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        opacity={0.8}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      fontWeight: "bold",
                    }}
                    itemStyle={{ fontSize: "12px" }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
