import { z } from "zod";

export const recruiterProfileSchema = z.object({
  employerName: z
    .string()
    .min(2, "Employer name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  foundedDate: z.string().min(1, "Founded date is required"),
  companySize: z.string().min(1, "Company size is required"),
  showProfile: z.string(),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  profileUrl: z
    .string()
    .url("Invalid profile URL")
    .optional()
    .or(z.literal("")),
  aboutCompany: z.string().min(10, "About company description is too short"),
  introVideo: z.string().url("Invalid video URL").optional().or(z.literal("")),
  facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  address: z.string().min(5, "Address must be at least 5 characters"),
  location: z.string().min(1, "Location is required"),
  mapLocation: z.string().min(1, "Map location is required"),
});

export type RecruiterProfileFormData = z.infer<typeof recruiterProfileSchema>;
