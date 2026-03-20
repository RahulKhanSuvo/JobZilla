import { cn } from "@/lib/utils";

type StackProps = {
  direction?: "vertical" | "horizontal"; // default vertical
  gap?: "sm" | "md" | "lg" | "xl"; // gap sizes
  align?: "start" | "center" | "end"; // new alignment prop
  children: React.ReactNode;
  className?: string;
};

const gapSizes: Record<string, string> = {
  sm: "gap-2 md:gap-3",
  md: "gap-4 md:gap-6",
  lg: "gap-6 md:gap-8",
  xl: "gap-8 md:gap-10",
};

// Alignment mapping for Tailwind
const alignMap: Record<string, string> = {
  start: "items-start justify-start",
  center: "items-center justify-center",
  end: "items-end justify-end",
};

export default function Stack({
  direction = "vertical",
  gap = "md",
  align = "start",
  children,
  className,
}: StackProps) {
  const gapClass = gapSizes[gap] || gapSizes["md"];
  const flexDirection = direction === "vertical" ? "flex-col" : "flex-row";
  const alignClass = alignMap[align] || alignMap.start;

  return (
    <div className={cn("flex", flexDirection, gapClass, alignClass, className)}>
      {children}
    </div>
  );
}
