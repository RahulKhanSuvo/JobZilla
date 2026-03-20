import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// 1️⃣ Define your CVA styles and variants
const sectionTitleVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    size: {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-4xl",
      xl: "text-6xl",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "lg",
    align: "left",
  },
});

type SectionTitleProps = VariantProps<typeof sectionTitleVariants> & {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className,
  size,
  align,
}: SectionTitleProps) {
  return (
    <h2 className={cn(sectionTitleVariants({ size, align }), className)}>
      {children}
    </h2>
  );
}
