import { Check } from "lucide-react";

interface PlanFeatureItemProps {
  feature: string;
}

export function PlanFeatureItem({ feature }: PlanFeatureItemProps) {
  return (
    <li className="flex items-start gap-3 text-slate-600">
      <div className="shrink-0 mt-0.5 rounded-full bg-primary/10 p-0.5">
        <Check className="size-3.5 text-primary stroke-[3px]" />
      </div>
      <span className="text-sm font-medium">{feature}</span>
    </li>
  );
}
