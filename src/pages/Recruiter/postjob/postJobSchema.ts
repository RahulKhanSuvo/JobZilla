import { z } from "zod";

export const JobTypeEnum = z.enum([
  "FULL_TIME",
  "PART_TIME",
  "FREELANCE",
  "CONTRACT",
  "INTERN",
  "REMOTE",
]);

export const postJobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  category: z.string().min(1, "Job category is required"),
  gender: z.string().min(1, "Gender is required"),
  salaryType: z.string().min(1, "Salary type is required"),
  salaryMin: z.coerce.number().min(1, "Salary min is required"),
  salaryMax: z.coerce.number().min(1, "Salary max is required"),
  jobType: JobTypeEnum.nullish(),
  locationType: z.string().min(1, "Location type is required"),
  location: z.string().min(1, "Location is required"),
  experience: z.string().max(100).min(1, "Experience is required"),
  careerLevel: z.string().min(1, "Career level is required"),
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
