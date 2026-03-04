import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────

type JobStatus = "Active" | "Draft" | "Closed";
type TabStatus = "All Jobs" | "Active" | "Drafts" | "Closed";

interface Job {
  id: number;
  title: string;
  category: string;
  location: string;
  status: JobStatus;
  datePosted: string;
  totalApplications: number;
  qualifiedMatches: number; // percentage
}

// ── Mock Data ───────────────────────────────────────────

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Senior Product Designer",
    category: "Design",
    location: "Remote",
    status: "Active",
    datePosted: "Oct 12, 2023",
    totalApplications: 45,
    qualifiedMatches: 80,
  },
  {
    id: 2,
    title: "Frontend Engineer",
    category: "Engineering",
    location: "San Francisco",
    status: "Active",
    datePosted: "Oct 10, 2023",
    totalApplications: 120,
    qualifiedMatches: 60,
  },
  {
    id: 3,
    title: "Marketing Manager",
    category: "Marketing",
    location: "Hybrid",
    status: "Draft",
    datePosted: "Oct 15, 2023",
    totalApplications: 0,
    qualifiedMatches: 0,
  },
  {
    id: 4,
    title: "Backend Developer",
    category: "Engineering",
    location: "Remote",
    status: "Closed",
    datePosted: "Sep 20, 2023",
    totalApplications: 85,
    qualifiedMatches: 75,
  },
  {
    id: 5,
    title: "Product Manager",
    category: "Management",
    location: "New York",
    status: "Active",
    datePosted: "Oct 05, 2023",
    totalApplications: 62,
    qualifiedMatches: 45,
  },
  {
    id: 6,
    title: "Data Analyst",
    category: "Data",
    location: "Remote",
    status: "Active",
    datePosted: "Oct 01, 2023",
    totalApplications: 38,
    qualifiedMatches: 55,
  },
];

const PAGE_SIZE = 5;

// ── Component ─────────────────────────────────────────────

export default function MyJobs() {
  const [activeTab, setActiveTab] = useState<TabStatus>("All Jobs");
  const [page, setPage] = useState(1);

  const filteredJobs = mockJobs.filter((job) => {
    if (activeTab === "All Jobs") return true;
    if (activeTab === "Active") return job.status === "Active";
    if (activeTab === "Drafts") return job.status === "Draft";
    if (activeTab === "Closed") return job.status === "Closed";
    return true;
  });

  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const getStatusStyles = (status: JobStatus) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Draft":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Closed":
        return "bg-slate-50 text-slate-600 border-slate-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const tabs: { label: TabStatus; count: number }[] = [
    { label: "All Jobs", count: mockJobs.length },
    {
      label: "Active",
      count: mockJobs.filter((j) => j.status === "Active").length,
    },
    {
      label: "Drafts",
      count: mockJobs.filter((j) => j.status === "Draft").length,
    },
    {
      label: "Closed",
      count: mockJobs.filter((j) => j.status === "Closed").length,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header & Tabs ─────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-6 border-b border-slate-100 w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => {
                setActiveTab(tab.label);
                setPage(1);
              }}
              className={`pb-3 text-sm font-medium transition-all relative ${
                activeTab === tab.label
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.label
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </span>
              {activeTab === tab.label && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shrink-0 self-end md:self-auto">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* ── Table Card ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Date Posted
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Total Applications
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Qualified Matches
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedJobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {job.category} • {job.location}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getStatusStyles(
                        job.status,
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600">
                    {job.datePosted}
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600 font-medium">
                    {job.totalApplications}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${job.qualifiedMatches}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-8">
                        {job.qualifiedMatches}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreHorizontal className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedJobs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-slate-500 italic"
                  >
                    No jobs found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ───────────────────────────────── */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-medium">
              {filteredJobs.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(page * PAGE_SIZE, filteredJobs.length)}
            </span>{" "}
            of <span className="font-medium">{filteredJobs.length}</span> jobs
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center justify-center h-8 px-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="size-3.5 mr-1" />
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`size-8 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                    page === n
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-100"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="flex items-center justify-center h-8 px-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              Next
              <ChevronRight className="size-3.5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
