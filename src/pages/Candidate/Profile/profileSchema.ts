import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  dob: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).nullable().optional(),
  maritalStatus: z.string().nullable().optional(),
  language: z.array(z.string()).optional(),
  aboutMe: z.string().optional(),
  careerFinding: z.string().optional(),
  // Skills — array of skill strings
  skills: z.array(z.string()).optional(),

  // Education — mirrors Prisma `eduction` model
  educationList: z
    .array(
      z.object({
        institution: z.string().min(1, "Institution is required"),
        major: z.string().min(1, "Major is required"),
        field: z.string().min(1, "Field of study is required"),
        gap: z.number().min(0, "Gap must be 0 or more").optional(),
        startData: z.string().min(1, "Start date is required"),
        endData: z.string().optional(),
        isStudying: z.boolean().optional(),
      }),
    )
    .optional(),

  experienceList: z
    .array(
      z.object({
        jobTitle: z.string().min(1, "Job title is required"),
        companyName: z.string().min(1, "Company name is required"),
        industry: z.string().min(1, "Industry is required"),
        startData: z.string().min(1, "Start date is required"),
        endData: z.string().optional(),
        isWorking: z.boolean().optional(),
        Description: z.string().optional(),
      }),
    )
    .optional(),

  // Social links
  facebook: z.string().url("Invalid URL").or(z.literal("")).optional(),
  linkedin: z.string().url("Invalid URL").or(z.literal("")).optional(),
  twitter: z.string().url("Invalid URL").or(z.literal("")).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
