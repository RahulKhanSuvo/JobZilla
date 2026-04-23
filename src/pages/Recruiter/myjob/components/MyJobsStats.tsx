import CommonWrapper from "@/components/common/CommonWrapper";
import StatsCardSkeleton from "@/components/common/StatsCardSkeleton";
import { motion } from "motion/react";
interface StatItem {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

interface MyJobsStatsProps {
  stats: StatItem[];
  isLoading: boolean;
}
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
export default function MyJobsStats({ stats, isLoading }: MyJobsStatsProps) {
  if (isLoading) {
    return <StatsCardSkeleton count={4} />;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div variants={item} key={index}>
          <CommonWrapper className="px-6 py-6 flex items-center gap-5">
            <div
              className={`size-14 rounded-2xl flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="size-7" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 font-medium mt-1">
                {stat.label}
              </p>
            </div>
          </CommonWrapper>
        </motion.div>
      ))}
    </motion.div>
  );
}
