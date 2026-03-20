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
const candidateSchema = z.object({
  role: z.literal("candidate"),
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(64, { message: "Password must be at most 64 characters" }),
});

const employerSchema = z.object({
  role: z.literal("employer"),
  companyName: z.string().min(1, { message: "Company name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(64, { message: "Password must be at most 64 characters" }),
});

export const signUpSchema = z.discriminatedUnion("role", [
  candidateSchema,
  employerSchema,
]);

export type signUpFormData = z.infer<typeof signUpSchema>;
export type CandidateFormData = z.infer<typeof candidateSchema>;
export type EmployerFormData = z.infer<typeof employerSchema>;
