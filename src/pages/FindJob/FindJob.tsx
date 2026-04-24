import { useEffect, useMemo, useState, useRef } from "react";
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
import { useSearchParams } from "react-router";

export default function FindJob() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [layout, setLayout] = useState<"grid" | "list">("list");

  // Initial values from URL or defaults
  const initialValues = useMemo(() => {
    const salaryParam = searchParams.get("salary");
    return {
      searchTerm: searchParams.get("searchTerm") || "",
      location: searchParams.get("location") || "",
      jobType: searchParams.get("jobType") || "all",
      salary: salaryParam ? salaryParam.split(",") : [],
      postedAnytime: searchParams.get("postedAnytime") || "anytime",
      seniorityLevel: searchParams.get("seniorityLevel") || "all",
      category: searchParams.get("category") || "all",
      locationType: searchParams.get("locationType") || "all",
    };
  }, [searchParams]);

  const form = useForm<JobFilterValues>({
    resolver: zodResolver(jobFilterSchema),
    defaultValues: initialValues,
  });

  const { control, reset, getValues } = form;
  const filters = useWatch({ control });
  const lastFiltersRef = useRef(filters);

  // Sync form to URL params (Debounced for searchTerm)
  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      let hasChanges = false;

      Object.entries(filters).forEach(([key, value]) => {
        const prevValue = searchParams.get(key);
        const isDefault =
          value === "all" ||
          value === "anytime" ||
          (Array.isArray(value) && value.length === 0) ||
          !value;

        if (isDefault) {
          if (prevValue !== null) {
            newParams.delete(key);
            hasChanges = true;
          }
        } else {
          const stringValue = Array.isArray(value)
            ? value.join(",")
            : String(value);
          if (prevValue !== stringValue) {
            newParams.set(key, stringValue);
            hasChanges = true;
            newParams.delete("page");
          }
        }
      });

      if (hasChanges) {
        setSearchParams(newParams, { replace: true });
      }
      lastFiltersRef.current = filters;
    }, 200); // Debounce to allow smooth typing

    return () => clearTimeout(timer);
  }, [filters, searchParams, setSearchParams]);

  // Sync URL params back to form only if they differ (handles browser back/forward)
  useEffect(() => {
    const currentValues = getValues();
    const isDifferent = Object.keys(initialValues).some((key) => {
      const k = key as keyof JobFilterValues;
      const urlValue = initialValues[k];
      const formValue = currentValues[k];

      if (Array.isArray(urlValue) && Array.isArray(formValue)) {
        return urlValue.join(",") !== formValue.join(",");
      }
      return urlValue !== formValue;
    });

    if (isDifferent) {
      reset(initialValues);
    }
  }, [initialValues, reset, getValues]);

  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "default";
  const limit = Number(searchParams.get("limit")) || 10;

  // Map UI sort labels to API sort parameters
  const sortParams = useMemo(() => {
    if (sortBy === "newest")
      return { sortBy: "createdAt" as const, sortOrder: "desc" as const };
    if (sortBy === "salary")
      return { sortBy: "salaryMax" as const, sortOrder: "desc" as const };
    return { sortBy: undefined, sortOrder: undefined };
  }, [sortBy]);

  const { data, isLoading } = useGetAllJobsQuery({
    ...filters,
    ...sortParams,
    page,
    limit,
  });
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
                sortBy={sortBy}
                setSortBy={(val) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (val === "default") newParams.delete("sortBy");
                  else newParams.set("sortBy", val);
                  setSearchParams(newParams);
                }}
                limit={limit}
                setLimit={(val) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (val === 10) newParams.delete("limit");
                  else newParams.set("limit", String(val));
                  setSearchParams(newParams);
                }}
              />
            </div>
            <JobList layout={layout} jobs={jobs} isLoading={isLoading} />
            {(data?.meta?.totalPages ?? 0) > 1 && (
              <Pagination
                page={page}
                totalPage={data?.meta?.totalPages ?? 0}
                onPageChange={(newPage) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (newPage === 1) newParams.delete("page");
                  else newParams.set("page", String(newPage));
                  setSearchParams(newParams);
                }}
              />
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
