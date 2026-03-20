import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  variant?: "default" | "ghost" | "withBg";
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
};

function Input({
  className,
  type,
  variant = "default",
  size = "default",
  ...props
}: InputProps) {
  const inputVariant = cva(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-[50px] w-full min-w-0 bg-transparent px-3 py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    {
      variants: {
        variant: {
          default:
            "border border-input shadow-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          withBg:
            "bg-[#F5F5F5] dark:bg-[#222222] border focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] h-12 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          ghost:
            "border-none shadow-none  py-0 ring-0 focus-visible:ring-0 focus-visible:border-transparent px-0 h-auto",
        },
        size: {
          default: "md:h-9 lg:h-10 px-4 py-2 has-[>svg]:px-3",
          xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
          sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
          lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
          icon: "size-9",
          "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
          "icon-sm": "size-8",
          "icon-lg": "size-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    },
  );
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariant({ variant, size, className }))}
      {...props}
    />
  );
}

export { Input };
