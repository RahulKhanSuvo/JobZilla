import { z } from "zod";

export const JobTypeEnum = z.enum([
  "FULL_TIME",
  "PART_TIME",
  "FREELANCE",
  "CONTRACT",
  "INTERN",
  "REMOTE",
]);
export const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER", "ANY"]);
export const SalaryTypeEnum = z.enum(["MONTHLY", "YEARLY", "HOURLY"]);
export const LocationTypeEnum = z.enum(["REMOTE", "ON_SITE", "HYBRID"]);
export const CareerLevelEnum = z.enum([
  "ENTRY_LEVEL",
  "MID_LEVEL",
  "SENIOR_LEVEL",
  "EXECUTIVE_LEVEL",
]);
export const postJobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  category: z.string().min(1, "Job category is required"),
  gender: GenderEnum,
  salaryType: SalaryTypeEnum,
  salaryMin: z.coerce.number().min(1, "Salary min is required"),
  salaryMax: z.coerce.number().min(1, "Salary max is required"),
  jobType: JobTypeEnum.nullish(),
  locationType: LocationTypeEnum,
  location: z.string().min(1, "Location is required"),
  experience: z.string().max(100).min(1, "Experience is required"),
  careerLevel: CareerLevelEnum,
  qualification: z.string().min(1, "Qualification is required"),
  deadline: z.coerce.date().min(new Date(), "Deadline cannot be in the past"),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  isSaved: z.boolean().nullish(),
  isApplied: z.boolean().nullish(),
  isFollowed: z.boolean().nullish(),
  user: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      company: z.object({
        location: z.string(),
        logo: z.string(),
      }),
    })
    .optional(),
});

export type PostJobFormData = z.infer<typeof postJobSchema>;
