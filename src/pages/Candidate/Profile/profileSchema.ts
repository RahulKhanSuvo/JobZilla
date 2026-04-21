import { z } from "zod";
export const preferredCategory = z.enum([
  "TECHNOLOGY",
  "DESIGN",
  "MARKETING",
  "SALES",
  "FINANCE",
  "HR",
  "OPERATIONS",
  "CUSTOMER_SUPPORT",
  "EDUCATION",
  "HEALTHCARE",
  "LEGAL",
  "OTHER",
]);

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  dob: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).nullable().optional(),
  maritalStatus: z.string().nullable(),
  preferredJobType: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "HYBRID"]),
  preferredCareerLevel: z.enum([
    "ENTRY_LEVEL",
    "MID_LEVEL",
    "SENIOR_LEVEL",
    "EXECUTIVE_LEVEL",
  ]),
  preferredCategory: preferredCategory,
  language: z.array(z.string()),
  aboutMe: z.string().min(10, "About me must be at least 10 characters"),
  // Skills — array of skill strings
  skills: z.array(z.string()),

  // Education — mirrors Prisma `eduction` model
  educationList: z
    .array(
      z.object({
        institution: z.string().min(1, "Institution is required"),
        major: z.string().min(1, "Major is required"),
        field: z.string().min(1, "Field of study is required"),
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
  github: z.string().url("Invalid URL").or(z.literal("")).optional(),
  avatar: z.any().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
