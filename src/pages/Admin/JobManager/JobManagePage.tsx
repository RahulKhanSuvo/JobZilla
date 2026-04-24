import { useState, useMemo } from "react";
import { DUMMY_JOBS, type AdminJob } from "./types";
import JobStats from "./components/JobStats";
import JobFilters from "./components/JobFilters";
import JobTable from "./components/JobTable";

export default function JobManagePage() {
  const [jobs, setJobs] = useState<AdminJob[]>(DUMMY_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === "all" || job.jobType === typeFilter;
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [jobs, searchQuery, typeFilter, statusFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Job Management
        </h1>
        <p className="text-muted-foreground">
          Monitor job postings, approve new submissions, and manage featured
          listings.
        </p>
      </div>

      <JobStats jobs={jobs} />

      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onClearFilters={clearFilters}
      />

      <JobTable
        jobs={filteredJobs}
        onUpdateStatus={(id, status) => {
          setJobs((prev) =>
            prev.map((j) => (j.id === id ? { ...j, status } : j)),
          );
        }}
        onToggleFeatured={(id, isFeatured) => {
          setJobs((prev) =>
            prev.map((j) => (j.id === id ? { ...j, isFeatured } : j)),
          );
        }}
        onDelete={(id) => {
          if (confirm("Are you sure you want to delete this job posting?")) {
            setJobs((prev) => prev.filter((j) => j.id !== id));
          }
        }}
      />
    </div>
  );
}
