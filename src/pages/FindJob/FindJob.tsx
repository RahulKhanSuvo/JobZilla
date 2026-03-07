import Container from "@/components/common/Container";
import JobFilters from "./components/JobFilters";
import JobHeader from "./components/JobHeader";
import JobList from "./components/JobList";
import Pagination from "./components/Pagination";

export default function FindJob() {
  return (
    <div className="bg-[#FBFCFD] min-h-screen py-10">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:block max-w-[400px] w-full">
            <JobFilters />
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-2">
            <JobHeader />
            <JobList />
            <Pagination />
          </main>
        </div>
      </Container>
    </div>
  );
}
