import Container from "@/components/common/Container";
import JobHeader from "./components/JobHeader";
import JobTabs from "./components/JobTabs";
import JobDescription from "./components/JobDescription";
import JobMedia from "./components/JobMedia";
import ReviewsSection from "./components/ReviewsSection";
import RelatedJobs from "./components/RelatedJobs";
import JobSidebar from "./components/JobSidebar";
import StickyJobBar from "./components/StickyJobBar";

export default function JobDetails() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-10 pb-32 transition-colors duration-300">
      <Container>
        <div className="space-y-8">
          {/* Top Section: Header */}
          <JobHeader />

          {/* Main Layout: Body + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              <JobTabs />
              <JobDescription />
              <JobMedia />
              <ReviewsSection />
              <RelatedJobs />
            </div>

            {/* Right Sidebar Column */}
            <aside className="lg:col-span-4 sticky top-10 space-y-8">
              <JobSidebar />
            </aside>
          </div>
        </div>
      </Container>

      {/* Floating Action Bar */}
      <StickyJobBar />
    </div>
  );
}
