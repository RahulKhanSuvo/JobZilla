import { useState } from "react";
import Container from "@/components/common/Container";
import JobFilters from "./components/JobFilters";
import JobHeader from "./components/JobHeader";
import JobList from "./components/JobList";
import Pagination from "./components/Pagination";
import { useGetAllJobsQuery } from "@/redux/features/job/job.api";
import type { PostJobFormData } from "../Recruiter/postjob/postJobSchema";

export default function FindJob() {
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const { data, isLoading } = useGetAllJobsQuery(params);
  const jobs: PostJobFormData[] = data?.data ?? [];
  const [layout, setLayout] = useState<"grid" | "list">("list");
  if (isLoading) return <div>loading</div>;
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-10 transition-colors duration-300">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:block max-w-100 w-full">
            <JobFilters />
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-4">
            <JobHeader layout={layout} setLayout={setLayout} />
            <JobList layout={layout} jobs={jobs} />
            <Pagination
              page={params.page}
              totalPage={data?.meta?.totalPage || 0}
              onPageChange={(page) => setParams({ ...params, page })}
            />
          </main>
        </div>
      </Container>
    </div>
  );
}
