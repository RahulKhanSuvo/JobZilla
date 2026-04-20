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
  id: z.string().nullish(),
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  category: z.string().min(1, "Job category is required"),
  gender: z.string().nullish(),
  salaryType: z.string().nullish(),
  salaryMin: z.coerce.number().nullish(),
  salaryMax: z.coerce.number().nullish(),
  jobType: JobTypeEnum.nullish(),
  experience: z.string().max(100).nullish(),
  careerLevel: z.string().nullish(),
  qualification: z.string().nullish(),
  deadline: z.coerce.date().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  isSaved: z.boolean().nullish(),
  isApplied: z.boolean().nullish(),
  isFollowed: z.boolean().nullish(),
  company: z
    .object({
      location: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
      }),
      logo: z.string(),
    })
    .optional(),
});

export type PostJobFormData = z.infer<typeof postJobSchema>;
