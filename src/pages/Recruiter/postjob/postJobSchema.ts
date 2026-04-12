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
  tags: z.array(z.string()).min(1, "Job tags are required"),
  gender: z.string().optional(),
  // externalUrl: z.string().url().optional(),
  // applyEmail: z.string().email().optional(),
  salaryType: z.string().optional(),
  salaryMin: z.coerce.number().optional(),
  salaryMax: z.coerce.number().optional(),
  jobType: JobTypeEnum.optional(),
  experience: z.string().max(100).optional(),
  careerLevel: z.string().optional(),
  qualification: z.string().optional(),
  deadline: z.coerce.date().optional(),
  skills: z.string().max(200).optional(),
  applyType: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isSaved: z.boolean().optional(),
  isApplied: z.boolean().optional(),
  company: z
    .object({
      location: z.string(),
      user: z.object({
        name: z.string(),
        email: z.string().email(),
      }),
      logo: z.string(),
    })
    .optional(),
});

export type PostJobFormData = z.infer<typeof postJobSchema>;
