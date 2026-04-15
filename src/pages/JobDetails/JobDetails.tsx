import { useState } from "react";
import Container from "@/components/common/Container";
import JobHeader from "./components/JobHeader";
import JobTabs from "./components/JobTabs";
import JobDescription from "./components/JobDescription";
import RelatedJobs from "./components/RelatedJobs";
import JobSidebar from "./components/JobSidebar";
// import StickyJobBar from "./components/StickyJobBar";
import { useParams } from "react-router";
import { useGetJobByIdQuery } from "@/redux/features/job/job.api";
import { skipToken } from "@reduxjs/toolkit/query";

export default function JobDetails() {
  const [activeTab, setActiveTab] = useState("about");
  const { id } = useParams();
  const { data, isLoading, isError } = useGetJobByIdQuery(id || skipToken);
  const jobData = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (isError || !jobData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Job Not Found
          </h2>
          <p className="text-slate-500">
            We couldn't find the job details you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <JobHeader job={jobData} />
      <Container className="space-y-6">
        <div className="grid grid-cols-1 pb-20 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <JobTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "about" ? (
              <JobDescription description={jobData.description} />
            ) : (
              <RelatedJobs companyId={jobData.companyId} />
            )}
          </div>

          {/* Right Sidebar Column */}
          <aside className="lg:col-span-4 sticky top-64 space-y-8">
            <JobSidebar job={jobData} />
          </aside>
        </div>
      </Container>
    </div>
  );
}
