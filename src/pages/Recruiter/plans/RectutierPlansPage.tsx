import { PlanHeader } from "./components/PlanHeader";
import { ActivePlanInfo } from "./components/ActivePlanInfo";
import { PlanCard } from "./components/PlanCard";
import { motion } from "framer-motion";

const AVAILABLE_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    interval: "month",
    features: ["1 Job Post", "Basic Support", "Standard Visibility"],
    buttonText: "Buy Now",
  },
  {
    id: "professional",
    name: "Professional",
    price: 49,
    interval: "month",
    isPopular: true,
    features: [
      "10 Job Posts",
      "Priority Support",
      "Candidate Search",
      "Featured Profile",
    ],
    buttonText: "Upgrade Now",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    interval: "month",
    features: [
      "Unlimited Job Posts",
      "Dedicated Manager",
      "API Access",
      "Custom Branding",
    ],
    buttonText: "Contact Sales",
  },
];

const CURRENT_PLAN = {
  id: "starter",
  name: "Starter",
  expiryDate: "2026-05-20",
  usage: {
    jobsPosted: 0,
    jobsLimit: 1,
  },
};

export default function RectutierPlansPage() {
  return (
    <div>
      <PlanHeader />

      <ActivePlanInfo plan={CURRENT_PLAN} />

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900">
            Choose the Perfect Plan
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Scale your hiring with our flexible pricing tiers designed for
            businesses of all sizes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 xl:gap-8 items-center">
          {AVAILABLE_PLANS.map((plan, index) => (
            <PlanCard
              key={plan.id}
              {...plan}
              index={index}
              isCurrent={plan.id === CURRENT_PLAN.id}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 bg-slate-900 rounded text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 space-y-2">
            <h3 className="text-2xl font-bold">Need a custom solution?</h3>
            <p className="text-slate-400 max-w-md">
              We offer tailored packages for large organizations with unique
              hiring needs and high-volume recruiting.
            </p>
          </div>
          <button className="relative z-10 bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl hover:bg-slate-100 transition-colors shrink-0 shadow-xl shadow-white/5">
            Talk to an Expert
          </button>
        </motion.div>
      </div>
    </div>
  );
}
