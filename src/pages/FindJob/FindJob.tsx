import { useState } from "react";
import Container from "@/components/common/Container";
import JobFilters from "./components/JobFilters";
import JobHeader from "./components/JobHeader";
import JobList from "./components/JobList";
import Pagination from "./components/Pagination";
import { useGetAllJobsQuery } from "@/redux/features/job/job.api";
import type { PostJobFormData } from "../Recruiter/postjob/postJobSchema";
import { useForm, useWatch } from "react-hook-form";
import {
  jobFilterSchema,
  type JobFilterValues,
} from "./components/jobFilterSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FindJob() {
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const [layout, setLayout] = useState<"grid" | "list">("list");
  const form = useForm<JobFilterValues>({
    resolver: zodResolver(jobFilterSchema),
    defaultValues: {
      searchTerm: "",
      location: "all",
      jobType: "all",
      salary: [],
      postedAnytime: "anytime",
      seniorityLevel: "all",
    },
  });
  const { control } = form;

  // Use useWatch instead of watch() to satisfy the React Compiler
  const filters = useWatch({
    control,
  });

  const { data, isLoading } = useGetAllJobsQuery({ ...params, ...filters });
  const jobs: PostJobFormData[] = data?.data ?? [];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-10 transition-colors duration-300">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:block max-w-100 w-full">
            <JobFilters form={form} />
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-4">
            <JobHeader
              layout={layout}
              setLayout={setLayout}
              total={data?.meta?.total || 0}
            />
            <JobList layout={layout} jobs={jobs} isLoading={isLoading} />
            {(data?.meta?.totalPage ?? 0) > 1 && (
              <Pagination
                page={params.page}
                totalPage={data?.meta?.totalPage ?? 0}
                onPageChange={(page) => setParams({ ...params, page })}
              />
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
