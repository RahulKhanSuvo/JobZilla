import { cn } from "@/lib/utils";

type CommonWrapperProps = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof wrapperVariant;
};
const wrapperVariant = {
  default: "p-6 bg-white",
  noPadding: "bg-white",
  noBorder: "p-6",
  noBorderNoPadding: "",
};

export default function CommonWrapper({
  children,
  className,
  variant = "default",
}: CommonWrapperProps) {
  return (
    <div className={cn(wrapperVariant[variant], className)}>{children}</div>
  );
}
