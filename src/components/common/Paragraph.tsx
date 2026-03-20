import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// 1️⃣ Define CVA for paragraph
const paragraphVariants = cva("text-paragraph leading-relaxed", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-accent",
    },
  },
  defaultVariants: {
    size: "md",
    align: "left",
    color: "default",
  },
});

// 2️⃣ Props for paragraph component
type ParagraphProps = VariantProps<typeof paragraphVariants> & {
  children: React.ReactNode;
  className?: string;
};

// 3️⃣ Component
export default function Paragraph({
  children,
  size,
  align,
  color,
  className,
}: ParagraphProps) {
  return (
    <p className={cn(paragraphVariants({ size, align, color }), className)}>
      {children}
    </p>
  );
}
