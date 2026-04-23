/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ChartSkeleton({
  className,
  customVariantIndex = 1,
  variants,
}: {
  className?: string;
  customVariantIndex?: number;
  variants: any;
}) {
  return (
    <motion.div
      custom={customVariantIndex}
      variants={variants}
      initial="hidden"
      animate="show"
      className={className}
    >
      <Card className="border-none shadow rounded overflow-hidden bg-white dark:bg-slate-900 h-full flex flex-col">
        <CardHeader className="pb-4 border-b border-slate-50 dark:border-slate-800">
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent className="pt-6 flex-1">
          <Skeleton className="h-64 w-full rounded-md" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
