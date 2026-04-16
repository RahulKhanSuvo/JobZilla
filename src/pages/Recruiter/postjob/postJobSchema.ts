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
  gender: z.string().optional(),
  salaryType: z.string().optional(),
  salaryMin: z.string().min(1, "Minimum salary is required"),
  salaryMax: z.string().min(1, "Maximum salary is required"),
  jobType: JobTypeEnum.optional(),
  experience: z.string().max(100).optional(),
  careerLevel: z.string().optional(),
  qualification: z.string().optional(),
  deadline: z.coerce.date().optional(),
  skills: z.string().max(200).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isSaved: z.boolean().optional(),
  isApplied: z.boolean().optional(),
  isFollowed: z.boolean().optional(),
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
