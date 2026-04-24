import { z } from "zod";

// ── Login ───────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ── Sign Up ─────────────────────────────────────────────
const passwordMatchRefine = (data: {
  password?: string;
  confirmPassword?: string;
}) => data.password === data.confirmPassword;
const passwordMatchParams = {
  message: "Passwords don't match",
  path: ["confirmPassword"],
};

const baseCandidateSchema = z.object({
  role: z.literal("CANDIDATE"),
  name: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(64, { message: "Password must be at most 64 characters" }),
  confirmPassword: z.string(),
});

const baseEmployerSchema = z.object({
  role: z.literal("EMPLOYER"),
  name: z.string().min(1, { message: "Company name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(64, { message: "Password must be at most 64 characters" }),
  confirmPassword: z.string(),
});

export const signUpSchema = z
  .discriminatedUnion("role", [baseCandidateSchema, baseEmployerSchema])
  .refine(passwordMatchRefine, passwordMatchParams);

export const candidateSchema = baseCandidateSchema.refine(
  passwordMatchRefine,
  passwordMatchParams,
);
export const employerSchema = baseEmployerSchema.refine(
  passwordMatchRefine,
  passwordMatchParams,
);

export type signUpFormData = z.infer<typeof signUpSchema>;
export type CandidateFormData = z.infer<typeof candidateSchema>;
export type EmployerFormData = z.infer<typeof employerSchema>;

// ── Forgot Password ─────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
});
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ── Reset Password ──────────────────────────────────────
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine(passwordMatchRefine, passwordMatchParams);
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
