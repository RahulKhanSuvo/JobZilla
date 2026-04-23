import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
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
export default function StatsCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          variants={item}
          key={i}
          className="px-6 py-6 flex items-center gap-5 rounded border-none bg-white dark:bg-[#222]"
        >
          {/* Icon skeleton */}
          <Skeleton className="size-14 rounded-2xl" />

          <div className="space-y-2 w-full">
            {/* Value skeleton */}
            <Skeleton className="h-6 w-16" />

            {/* Label skeleton */}
            <Skeleton className="h-4 w-24" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
