import { useState } from "react";
import {
  Bookmark,
  Search,
  MapPin,
  Briefcase,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Trash2,
  ExternalLink,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────

type JobType = "Full-time" | "Part-time" | "Contract" | "Remote" | "Hybrid";

interface SavedJob {
  id: number;
  logo: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  savedOn: string;
  deadline: string;
  isUrgent?: boolean;
  tags: string[];
}

// ── Mock data ─────────────────────────────────────────────

const savedJobs: SavedJob[] = [
  {
    id: 1,
    logo: "https://logo.clearbit.com/google.com",
    title: "Senior Product Designer",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    salary: "$140k – $190k",
    savedOn: "02 Mar, 2024",
    deadline: "15 Mar, 2024",
    isUrgent: true,
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    id: 2,
    logo: "https://logo.clearbit.com/amazon.com",
    title: "Frontend Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Hybrid",
    salary: "$120k – $160k",
    savedOn: "01 Mar, 2024",
    deadline: "22 Mar, 2024",
    tags: ["React", "TypeScript", "AWS"],
  },
  {
    id: 3,
    logo: "https://logo.clearbit.com/stripe.com",
    title: "Lead UX Researcher",
    company: "Stripe",
    location: "Remote",
    type: "Remote",
    salary: "$130k – $170k",
    savedOn: "28 Feb, 2024",
    deadline: "10 Mar, 2024",
    isUrgent: true,
    tags: ["User Research", "Figma", "Data Analysis"],
  },
  {
    id: 4,
    logo: "https://logo.clearbit.com/airbnb.com",
    title: "Motion Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$80k – $100k",
    savedOn: "27 Feb, 2024",
    deadline: "30 Mar, 2024",
    tags: ["After Effects", "Lottie", "Figma"],
  },
  {
    id: 5,
    logo: "https://logo.clearbit.com/spotify.com",
    title: "Design Technologist",
    company: "Spotify",
    location: "New York, NY",
    type: "Full-time",
    salary: "$150k – $200k",
    savedOn: "25 Feb, 2024",
    deadline: "05 Apr, 2024",
    tags: ["React", "CSS", "Design Systems"],
  },
  {
    id: 6,
    logo: "https://logo.clearbit.com/notion.so",
    title: "Product Manager",
    company: "Notion",
    location: "Remote",
    type: "Remote",
    salary: "$160k – $210k",
    savedOn: "22 Feb, 2024",
    deadline: "18 Mar, 2024",
    tags: ["Product Strategy", "Agile", "Analytics"],
  },
  {
    id: 7,
    logo: "https://logo.clearbit.com/figma.com",
    title: "Staff Design Engineer",
    company: "Figma",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$180k – $240k",
    savedOn: "20 Feb, 2024",
    deadline: "25 Mar, 2024",
    tags: ["TypeScript", "React", "Design Tokens"],
  },
  {
    id: 8,
    logo: "https://logo.clearbit.com/linear.app",
    title: "Frontend Architect",
    company: "Linear",
    location: "Remote",
    type: "Remote",
    salary: "$170k – $220k",
    savedOn: "18 Feb, 2024",
    deadline: "28 Mar, 2024",
    tags: ["React", "Vite", "Architecture"],
  },
];

// ── Helpers ───────────────────────────────────────────────

const typeStyles: Record<JobType, string> = {
  "Full-time": "bg-blue-50 text-blue-600",
  "Part-time": "bg-yellow-50 text-yellow-600",
  Contract: "bg-purple-50 text-purple-600",
  Remote: "bg-green-50 text-green-600",
  Hybrid: "bg-orange-50 text-orange-600",
};

const PAGE_SIZE = 5;

const filterOptions: (JobType | "All Types")[] = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Remote",
  "Hybrid",
];

function daysUntil(dateStr: string) {
  const deadline = new Date(dateStr.replace(",", ""));
  const today = new Date("2024-03-04");
  const diff = Math.ceil(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diff;
}

// ── Main ──────────────────────────────────────────────────

export default function SaveJob() {
  const [jobs, setJobs] = useState<SavedJob[]>(savedJobs);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<JobType | "All Types">(
    "All Types",
  );
  const [sortBy, setSortBy] = useState("Newest First");
  const [page, setPage] = useState(1);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleUnsave = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setJobs((prev) => prev.filter((j) => j.id !== id));
      setRemovingId(null);
      setPage(1);
    }, 300);
  };

  const filtered = jobs.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All Types" || j.type === typeFilter;
    return matchSearch && matchType;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Newest First")
      return new Date(b.savedOn).getTime() - new Date(a.savedOn).getTime();
    if (sortBy === "Oldest First")
      return new Date(a.savedOn).getTime() - new Date(b.savedOn).getTime();
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-10">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">Saved Jobs</h1>
          <p className="text-sm text-[color:var(--paragraph)] mt-0.5">
            You have{" "}
            <span className="font-semibold text-foreground">{jobs.length}</span>{" "}
            saved job{jobs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(
          [
            {
              label: "Total Saved",
              value: jobs.length,
              color: "text-primary",
              bg: "bg-green-50",
            },
            {
              label: "Full-time",
              value: jobs.filter((j) => j.type === "Full-time").length,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Remote",
              value: jobs.filter((j) => j.type === "Remote").length,
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              label: "Closing Soon",
              value: jobs.filter((j) => daysUntil(j.deadline) <= 7).length,
              color: "text-red-500",
              bg: "bg-red-50",
            },
          ] as const
        ).map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-border shadow-sm px-4 py-3 flex items-center gap-3"
          >
            <div
              className={`size-8 rounded-lg flex items-center justify-center ${s.bg}`}
            >
              <Bookmark className={`size-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-xs text-[color:var(--paragraph)]">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter bar ──────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-4 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[color:var(--paragraph)] pointer-events-none" />
          <input
            type="text"
            placeholder="Search jobs, companies..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Type filter */}
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as JobType | "All Types");
              setPage(1);
            }}
            className="h-9 pl-3 pr-8 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
          >
            {filterOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-[color:var(--paragraph)] pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 pl-3 pr-8 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
          >
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-[color:var(--paragraph)] pointer-events-none" />
        </div>
      </div>

      {/* ── Job list ────────────────────────────────────── */}
      {paginated.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-xl border border-border shadow-sm py-16 flex flex-col items-center text-center gap-3">
          <div className="size-14 rounded-full bg-slate-100 flex items-center justify-center">
            <Bookmark className="size-6 text-slate-400" />
          </div>
          <p className="font-semibold text-foreground">No saved jobs found</p>
          <p className="text-sm text-[color:var(--paragraph)] max-w-xs">
            {search || typeFilter !== "All Types"
              ? "Try adjusting your filters."
              : "Browse jobs and click the bookmark icon to save them here."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map((job) => {
            const days = daysUntil(job.deadline);
            const isRemoving = removingId === job.id;
            return (
              <div
                key={job.id}
                className={`bg-white rounded-xl border border-border shadow-sm p-5 transition-all duration-300 ${
                  isRemoving ? "opacity-0 scale-95" : "opacity-100"
                }`}
              >
                <div className="flex gap-4">
                  {/* Logo */}
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="size-12 rounded-xl object-contain border border-border p-1.5 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=random&size=48`;
                    }}
                  />
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-base text-foreground leading-snug">
                            {job.title}
                          </h3>
                          {job.isUrgent && (
                            <span className="text-[10px] font-semibold bg-red-50 text-red-500 px-2 py-0.5 rounded-full">
                              Closing Soon
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[color:var(--paragraph)] mt-0.5">
                          {job.company}
                        </p>
                      </div>
                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleUnsave(job.id)}
                          className="size-8 rounded-lg border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                          aria-label="Remove saved job"
                          title="Unsave"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">
                          Apply Now
                          <ExternalLink className="size-3" />
                        </button>
                      </div>
                    </div>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mt-2.5">
                      <span className="flex items-center gap-1 text-xs text-[color:var(--paragraph)]">
                        <MapPin className="size-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[color:var(--paragraph)]">
                        <Briefcase className="size-3.5" />
                        {job.salary}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeStyles[job.type]}`}
                      >
                        {job.type}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <span className="flex items-center gap-1 text-[11px] text-[color:var(--paragraph)]">
                        <Bookmark className="size-3.5 text-primary" />
                        Saved on {job.savedOn}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-[11px] font-medium ${
                          days <= 7
                            ? "text-red-500"
                            : days <= 14
                              ? "text-yellow-600"
                              : "text-[color:var(--paragraph)]"
                        }`}
                      >
                        <Clock className="size-3.5" />
                        {days <= 0
                          ? "Expired"
                          : days === 1
                            ? "1 day left"
                            : `${days} days left`}{" "}
                        · Deadline {job.deadline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pagination ──────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[color:var(--paragraph)]">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, sorted.length)} –{" "}
            {Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length} jobs
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="size-8 rounded-lg border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-muted disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`size-8 rounded-lg text-sm font-semibold transition-colors ${
                  page === n
                    ? "bg-foreground text-white"
                    : "border border-border text-[color:var(--paragraph)] hover:bg-muted"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="size-8 rounded-lg border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-muted disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
