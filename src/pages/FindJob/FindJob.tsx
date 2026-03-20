import { useState } from "react";
import Container from "@/components/common/Container";
import JobFilters from "./components/JobFilters";
import JobHeader from "./components/JobHeader";
import JobList from "./components/JobList";
import Pagination from "./components/Pagination";

export default function FindJob() {
  const [layout, setLayout] = useState<"grid" | "list">("list");

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-10 transition-colors duration-300">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:block max-w-[400px] w-full">
            <JobFilters />
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-4">
            <JobHeader layout={layout} setLayout={setLayout} />
            <JobList layout={layout} />
            <Pagination />
          </main>
        </div>
      </Container>
    </div>
  );
}
