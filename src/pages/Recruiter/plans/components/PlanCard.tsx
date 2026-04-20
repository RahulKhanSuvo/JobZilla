import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PlanFeatureItem } from "./PlanFeatureItem";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  isCurrent?: boolean;
  index: number;
}

export function PlanCard({
  name,
  price,
  interval,
  features,
  isPopular,
  buttonText,
  isCurrent,
  index,
}: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col p-8 rounded border transition-all duration-300",
        isPopular
          ? "bg-white border-primary shadow-xl shadow-primary/10 scale-105 z-10"
          : "bg-slate-50/50 border-slate-200 hover:border-primary/30 hover:bg-white",
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
          Most Popular
        </div>
      )}

      {isCurrent && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded border border-green-200">
          Current Plan
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-slate-900">
            ${price}
          </span>
          <span className="text-slate-500 font-medium text-sm">
            /{interval}
          </span>
        </div>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {features.map((feature, i) => (
          <PlanFeatureItem key={i} feature={feature} />
        ))}
      </ul>

      <Button
        variant={isPopular ? "default" : "outline"}
        size="lg"
        disabled={isCurrent}
        className={cn(
          "w-full font-bold rounded-xl",
          isPopular ? "shadow-lg shadow-primary/20" : "",
        )}
      >
        {isCurrent ? "Active Now" : buttonText}
      </Button>
    </motion.div>
  );
}
