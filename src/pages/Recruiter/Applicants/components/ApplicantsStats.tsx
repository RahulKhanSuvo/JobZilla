import CommonWrapper from "@/components/common/CommonWrapper";
import { Users, Check, Trophy, X } from "lucide-react";
import { motion } from "framer-motion";

interface ApplicantsStatsProps {
  statsData: {
    ALL: number;
    PENDING: number;
    SHORTLISTED: number;
    HIRED: number;
    REJECTED: number;
  };
}

export default function ApplicantsStats({ statsData }: ApplicantsStatsProps) {
  const stats = [
    {
      label: "Total Applicants",
      value: statsData.ALL,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Shortlisted",
      value: statsData.SHORTLISTED,
      icon: Check,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Hired",
      value: statsData.HIRED,
      icon: Trophy,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Rejected",
      value: statsData.REJECTED,
      icon: X,
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
        >
          <CommonWrapper className="px-5 py-5 flex items-center gap-4">
            <div
              className={`size-13 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}
            >
              <stat.icon className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {stat.label}
              </p>
            </div>
          </CommonWrapper>
        </motion.div>
      ))}
    </div>
  );
}
