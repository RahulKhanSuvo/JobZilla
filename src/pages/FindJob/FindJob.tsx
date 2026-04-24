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
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
      category: "all",
      locationType: "all",
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
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block max-w-[320px] w-full">
            <JobFilters form={form} />
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-4">
            {/* Mobile Filter Trigger */}
            <div className="flex justify-between">
              <div className="lg:hidden flex items-center justify-between mb-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 h-10 px-4 rounded-none shadow-none"
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-full sm:max-w-md overflow-y-auto p-0 border-r-0 dark:bg-slate-950"
                  >
                    <SheetHeader className="p-4 border-b border-slate-100 dark:border-slate-800 text-left">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">
                      <JobFilters form={form} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <JobHeader
                layout={layout}
                setLayout={setLayout}
                total={data?.meta?.total || 0}
              />
            </div>
            <JobList layout={layout} jobs={jobs} isLoading={isLoading} />
            {(data?.meta?.totalPages ?? 0) > 1 && (
              <Pagination
                page={params.page}
                totalPage={data?.meta?.totalPages ?? 0}
                onPageChange={(page) => setParams({ ...params, page })}
              />
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
