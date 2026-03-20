import { z } from "zod";

export const postJobSchema = z.object({
  featuredImage: z.string().optional(),
  title: z.string().min(5, "Job title must be at least 5 characters"),
  description: z.string().min(20, "Job description is too short"),
  category: z.string().min(1, "Category is required"),
  type: z.string().min(1, "Job type is required"),
  tags: z.array(z.string()).optional(),
  gender: z.string().min(1, "Gender is required"),
  applyType: z.string().min(1, "Apply type is required"),
  externalUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  applyEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  salaryType: z.string().min(1, "Salary type is required"),
  experience: z.string().min(1, "Experience is required"),
  careerLevel: z.string().min(1, "Career level is required"),
  qualification: z.string().min(1, "Qualification is required"),
  videoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  deadline: z.string().min(1, "Deadline is required"),
});

export type PostJobFormData = z.infer<typeof postJobSchema>;
