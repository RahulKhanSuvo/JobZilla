import { z } from "zod";

const createPlanSchema = z.object({
  name: z
    .string()
    .min(1, "Plan name is required")
    .max(50, "Plan name must be less than 50 characters"),

  price: z.coerce
    .number()
    .min(0, "Price must be at least 0")
    .refine((val) => !isNaN(val), {
      message: "Price is required",
    }),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),

  maxPostings: z.coerce
    .number()
    .min(1, "Max postings must be at least 1")
    .max(10000, "Max postings is too large"),

  features: z
    .array(
      z
        .string()
        .min(1, "Feature cannot be empty")
        .max(100, "Feature is too long"),
    )
    .min(1, "Add at least one feature"),

  billingInterval: z.enum(["MONTHLY", "YEARLY"], {
    errorMap: () => ({ message: "Billing cycle is required" }),
  }),

  currency: z.enum(["USD", "EUR", "BDT"], {
    errorMap: () => ({ message: "Currency is required" }),
  }),

  duration: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Duration must be a valid number",
    }),

  isActive: z.boolean(),

  isHighlight: z.boolean(),

  stripeProductId: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith("prod_"), {
      message: "Invalid Stripe product ID",
    }),

  stripePriceId: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith("price_"), {
      message: "Invalid Stripe price ID",
    }),
});

export const PlanSchema = {
  createPlanSchema,
};

export type IPlan = z.infer<typeof createPlanSchema>;
