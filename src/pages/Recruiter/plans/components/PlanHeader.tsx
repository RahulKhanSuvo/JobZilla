import { motion } from "framer-motion";

export function PlanHeader() {
  return (
    <div className="flex flex-col py-8 px-6 bg-linear-to-r from-primary to-primary/80 rounded text-white shadow shadow-primary/10 mb-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-1"
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Plans & Subscriptions
        </h1>
        <p className="text-white/80 font-medium font-lato">
          Manage your subscription and upgrade to reach more candidates.
        </p>
      </motion.div>
    </div>
  );
}
