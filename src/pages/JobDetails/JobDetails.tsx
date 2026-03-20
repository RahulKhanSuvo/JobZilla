import { useState } from "react";
import Container from "@/components/common/Container";
import JobHeader from "./components/JobHeader";
import JobTabs from "./components/JobTabs";
import JobDescription from "./components/JobDescription";
import RelatedJobs from "./components/RelatedJobs";
import JobSidebar from "./components/JobSidebar";
// import StickyJobBar from "./components/StickyJobBar";

export default function JobDetails() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <JobHeader />
      <Container className="space-y-6">
        <div className="grid grid-cols-1 pb-20 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <JobTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "about" ? <JobDescription /> : <RelatedJobs />}
          </div>

          {/* Right Sidebar Column */}
          <aside className="lg:col-span-4 sticky top-64 space-y-8">
            <JobSidebar />
          </aside>
        </div>
      </Container>

      {/* Floating Action Bar */}
      {/* <StickyJobBar /> */}
    </div>
  );
}
