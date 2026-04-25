import { motion } from "motion/react";

export default function DashboardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="bg-primary h-8 w-1 rounded" />
      <h1 className="text-xl md:text-2xl font-semibold">{children}</h1>
    </motion.div>
  );
}
