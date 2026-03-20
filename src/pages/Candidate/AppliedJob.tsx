import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Download,
  ChevronDown,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────

type AppStatus =
  | "Interviewing"
  | "Pending"
  | "Hired"
  | "Rejected"
  | "Shortlisted";
type FilterStatus = "All Status" | "Pending" | "Interviewing" | "Rejected";

interface JobApplication {
  id: number;
  logo: string;
  title: string;
  company: string;
  type: string;
  location: string;
  appliedDate: string;
  appliedTime: string;
  status: AppStatus;
}

// ── Data ─────────────────────────────────────────────────

const allApplications: JobApplication[] = [
  {
    id: 1,
    logo: "https://logo.clearbit.com/cloudcore.io",
    title: "Front End Developer Intern",
    company: "Cloud Core",
    type: "Full-time",
    location: "Dhaka",
    appliedDate: "12 Feb, 2024",
    appliedTime: "2:30 PM",
    status: "Interviewing",
  },
  {
    id: 2,
    logo: "https://logo.clearbit.com/bulipe.com",
    title: "Junior Web Developer",
    company: "Bulipe Tech",
    type: "Hybrid",
    location: "Remote",
    appliedDate: "08 Feb, 2024",
    appliedTime: "10:15 AM",
    status: "Pending",
  },
  {
    id: 3,
    logo: "https://logo.clearbit.com/headout.com",
    title: "Remote Developer Tools",
    company: "Headout",
    type: "Part-time",
    location: "Remote",
    appliedDate: "05 Feb, 2024",
    appliedTime: "09:00 AM",
    status: "Hired",
  },
  {
    id: 4,
    logo: "https://logo.clearbit.com/netflix.com",
    title: "UI/UX Designer",
    company: "Netflix",
    type: "Contract",
    location: "Remote",
    appliedDate: "02 Feb, 2024",
    appliedTime: "04:45 PM",
    status: "Rejected",
  },
  {
    id: 5,
    logo: "https://logo.clearbit.com/meta.com",
    title: "React Developer",
    company: "Meta",
    type: "Full-time",
    location: "London",
    appliedDate: "28 Jan, 2024",
    appliedTime: "11:20 AM",
    status: "Shortlisted",
  },
  {
    id: 6,
    logo: "https://logo.clearbit.com/stripe.com",
    title: "Frontend Engineer",
    company: "Stripe",
    type: "Full-time",
    location: "Remote",
    appliedDate: "25 Jan, 2024",
    appliedTime: "03:00 PM",
    status: "Pending",
  },
  {
    id: 7,
    logo: "https://logo.clearbit.com/airbnb.com",
    title: "Product Designer",
    company: "Airbnb",
    type: "Contract",
    location: "New York",
    appliedDate: "20 Jan, 2024",
    appliedTime: "11:00 AM",
    status: "Interviewing",
  },
  {
    id: 8,
    logo: "https://logo.clearbit.com/spotify.com",
    title: "Senior React Developer",
    company: "Spotify",
    type: "Full-time",
    location: "Stockholm",
    appliedDate: "18 Jan, 2024",
    appliedTime: "09:30 AM",
    status: "Shortlisted",
  },
  {
    id: 9,
    logo: "https://logo.clearbit.com/shopify.com",
    title: "JS Engineer",
    company: "Shopify",
    type: "Remote",
    location: "Toronto",
    appliedDate: "15 Jan, 2024",
    appliedTime: "02:15 PM",
    status: "Rejected",
  },
  {
    id: 10,
    logo: "https://logo.clearbit.com/figma.com",
    title: "UX Researcher",
    company: "Figma",
    type: "Full-time",
    location: "San Francisco",
    appliedDate: "10 Jan, 2024",
    appliedTime: "10:00 AM",
    status: "Hired",
  },
  {
    id: 11,
    logo: "https://logo.clearbit.com/notion.so",
    title: "Design Technologist",
    company: "Notion",
    type: "Full-time",
    location: "Remote",
    appliedDate: "07 Jan, 2024",
    appliedTime: "01:00 PM",
    status: "Pending",
  },
  {
    id: 12,
    logo: "https://logo.clearbit.com/linear.app",
    title: "Frontend Architect",
    company: "Linear",
    type: "Remote",
    location: "Berlin",
    appliedDate: "03 Jan, 2024",
    appliedTime: "09:00 AM",
    status: "Interviewing",
  },
];

// ── Status styling ────────────────────────────────────────

const statusConfig: Record<
  AppStatus,
  { dot: string; text: string; bg: string }
> = {
  Interviewing: {
    dot: "bg-blue-400",
    text: "text-blue-600",
    bg: "bg-blue-50",
  },
  Pending: {
    dot: "bg-yellow-400",
    text: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  Hired: {
    dot: "bg-green-500",
    text: "text-green-600",
    bg: "bg-green-50",
  },
  Rejected: {
    dot: "bg-red-400",
    text: "text-red-500",
    bg: "bg-red-50",
  },
  Shortlisted: {
    dot: "bg-orange-400",
    text: "text-orange-600",
    bg: "bg-orange-50",
  },
};

const PAGE_SIZE = 5;

const filterTabs: FilterStatus[] = [
  "All Status",
  "Pending",
  "Interviewing",
  "Rejected",
];

// ── Component ─────────────────────────────────────────────

export default function AppliedJob() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("All Status");
  const [page, setPage] = useState(1);

  const filtered =
    activeFilter === "All Status"
      ? allApplications
      : allApplications.filter((a) => a.status === activeFilter);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (f: FilterStatus) => {
    setActiveFilter(f);
    setPage(1);
  };

  // Derived stats
  const interviewing = allApplications.filter(
    (a) => a.status === "Interviewing",
  ).length;
  const shortlisted = allApplications.filter(
    (a) => a.status === "Shortlisted",
  ).length;
  const rejections = allApplications.filter(
    (a) => a.status === "Rejected",
  ).length;

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-10">
      {/* ── Stats ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Applied */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-5">
          <p className="text-[10px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase">
            Total Applied
          </p>
          <div className="flex items-end gap-3 mt-2">
            <p className="text-3xl font-bold text-foreground">
              {allApplications.length}
            </p>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-green-500 mb-1">
              <TrendingUp className="size-3.5" />
              12%
            </span>
          </div>
        </div>
        {/* Interviewing */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-5">
          <p className="text-[10px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase">
            Interviewing
          </p>
          <div className="flex items-end gap-3 mt-2">
            <p className="text-3xl font-bold text-foreground">
              {String(interviewing).padStart(2, "0")}
            </p>
            <span className="text-xs font-semibold text-blue-500 mb-1">
              Ongoing
            </span>
          </div>
        </div>
        {/* Shortlisted */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-5">
          <p className="text-[10px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase">
            Shortlisted
          </p>
          <div className="flex items-end gap-3 mt-2">
            <p className="text-3xl font-bold text-foreground">
              {String(shortlisted).padStart(2, "0")}
            </p>
            <span className="text-xs font-semibold text-yellow-500 mb-1">
              Pending
            </span>
          </div>
        </div>
        {/* Rejections */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-5">
          <p className="text-[10px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase">
            Rejections
          </p>
          <div className="flex items-end gap-3 mt-2">
            <p className="text-3xl font-bold text-foreground">
              {String(rejections).padStart(2, "0")}
            </p>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-red-500 mb-1">
              <TrendingDown className="size-3.5" />
              5%
            </span>
          </div>
        </div>
      </div>

      {/* ── Table Card ─────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-border shadow-sm">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-[color:var(--paragraph)] mr-1">
              Filter by:
            </span>
            {filterTabs.map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`text-sm px-3 py-1 rounded-full border transition-all ${
                  activeFilter === f
                    ? "bg-foreground text-white border-foreground"
                    : "border-border text-[color:var(--paragraph)] hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-sm border border-border rounded-lg px-3 py-1.5 text-foreground hover:bg-muted transition-colors">
              Last 30 Days
              <ChevronDown className="size-4 text-[color:var(--paragraph)]" />
            </button>
            <button className="flex items-center gap-1.5 text-sm border border-border rounded-lg px-3 py-1.5 text-foreground hover:bg-muted transition-colors">
              <Download className="size-4" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[11px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase px-5 py-3">
                  Job Information
                </th>
                <th className="text-left text-[11px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase px-5 py-3">
                  Applied Date
                </th>
                <th className="text-left text-[11px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase px-5 py-3">
                  Status
                </th>
                <th className="text-right text-[11px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((app, idx) => {
                const s = statusConfig[app.status];
                return (
                  <tr
                    key={app.id}
                    className={`border-b border-border last:border-0 transition-colors hover:bg-slate-50/50 ${
                      idx % 2 === 0 ? "" : ""
                    }`}
                  >
                    {/* Job info */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.logo}
                          alt={app.company}
                          className="size-10 rounded-lg object-contain border border-border p-1 bg-white shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(app.company)}&background=random&size=40`;
                          }}
                        />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {app.title}
                          </p>
                          <p className="text-xs text-[color:var(--paragraph)] mt-0.5">
                            {app.company} · {app.type} · {app.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Applied date */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-foreground">
                        {app.appliedDate}
                      </p>
                      <p className="text-xs text-[color:var(--paragraph)] mt-0.5">
                        {app.appliedTime}
                      </p>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}
                      >
                        <span className={`size-1.5 rounded-full ${s.dot}`} />
                        {app.status}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <button className="text-sm font-semibold text-primary hover:underline transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border">
          <p className="text-sm text-[color:var(--paragraph)]">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)} to{" "}
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}{" "}
            applications
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="size-8 rounded-lg border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-muted disabled:opacity-30 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`size-8 rounded-lg text-sm font-semibold transition-colors ${
                  page === n
                    ? "bg-foreground text-white border border-foreground"
                    : "border border-border text-[color:var(--paragraph)] hover:bg-muted"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="size-8 rounded-lg border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-muted disabled:opacity-30 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── CTA Banner ─────────────────────────────────── */}
      <div
        className="rounded-xl p-8 flex items-center justify-between gap-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a56db 0%, #1e3a8a 100%)",
        }}
      >
        {/* Decorative circle */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 size-40 rounded-full border-[3px] border-white/10 flex items-center justify-center pointer-events-none">
          <div className="size-28 rounded-full border-[3px] border-white/10 flex items-center justify-center">
            <span className="text-white/20 text-5xl font-bold">?</span>
          </div>
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white">
            Want to improve your chances?
          </h3>
          <p className="text-blue-200 text-sm mt-1 max-w-md">
            Our career experts have helped 1,000+ candidates land their dream
            roles. Get a free profile review today.
          </p>
          <button className="mt-5 bg-white text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
            Get Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
