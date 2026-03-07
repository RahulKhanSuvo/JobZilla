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
