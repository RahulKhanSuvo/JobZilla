import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  dob: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  maritalStatus: z.string().optional(),
  language: z.string().optional(),
  age: z.string().optional(),
  experience: z.string().optional(),
  educationList: z
    .array(
      z.object({
        academy: z.string().min(1, "Academy is required"),
        title: z.string().min(1, "Title is required"),
        startYear: z.string().min(1, "Start year is required"),
        endYear: z.string().min(1, "End year is required"),
        description: z.string().optional(),
      }),
    )
    .optional(),
  experienceList: z
    .array(
      z.object({
        company: z.string().min(1, "Company is required"),
        startYear: z.string().min(1, "Start year is required"),
        endYear: z.string().min(1, "End year is required"),
        description: z.string().optional(),
      }),
    )
    .optional(),
  skills: z.array(z.string()).optional(),
  aboutMe: z.string().optional(),
  facebook: z.string().url("Invalid URL").or(z.literal("")).optional(),
  linkedin: z.string().url("Invalid URL").or(z.literal("")).optional(),
  twitter: z.string().url("Invalid URL").or(z.literal("")).optional(),
  pinterest: z.string().url("Invalid URL").or(z.literal("")).optional(),
  instagram: z.string().url("Invalid URL").or(z.literal("")).optional(),
  youtube: z.string().url("Invalid URL").or(z.literal("")).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
