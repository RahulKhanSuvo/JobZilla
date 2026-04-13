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
const candidateSchema = z
  .object({
    role: z.literal("CANDIDATE"),
    name: z.string().min(1, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(64, { message: "Password must be at most 64 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const employerSchema = z
  .object({
    role: z.literal("EMPLOYER"),
    name: z.string().min(1, { message: "Company name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(64, { message: "Password must be at most 64 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signUpSchema = z.discriminatedUnion("role", [
  candidateSchema,
  employerSchema,
]);

export type signUpFormData = z.infer<typeof signUpSchema>;
export type CandidateFormData = z.infer<typeof candidateSchema>;
export type EmployerFormData = z.infer<typeof employerSchema>;
