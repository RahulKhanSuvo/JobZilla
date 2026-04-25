import { z } from "zod";

export const jobFilterSchema = z.object({
  searchTerm: z.string().optional(),
  location: z.string().default("all"),
  jobType: z.string().default("all"),
  salary: z.array(z.number()).default([0, 2000000]),
  postedAnytime: z.string().default("anytime"),
  seniorityLevel: z.string().default("all"),
  category: z.string().default("all"),
  locationType: z.string().default("all"),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
