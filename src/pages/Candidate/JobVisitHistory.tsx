import { useState } from "react";
import {
  History,
  Search,
  MapPin,
  Briefcase,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
  BriefcaseBusiness,
  TrendingUp,
  Building,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────

interface HistoryItem {
  id: number;
  logo: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  visitedAt: string; // ISO date
  jobType: string;
}

// ── Mock Data ─────────────────────────────────────────────

const mockHistory: HistoryItem[] = [
  {
    id: 1,
    logo: "https://logo.clearbit.com/google.com",
    title: "Senior Product Designer",
    company: "Google",
    industry: "Technology",
    location: "Mountain View, CA",
    visitedAt: "2024-03-04T08:30:00Z",
    jobType: "Full-time",
  },
  {
    id: 2,
    logo: "https://logo.clearbit.com/microsoft.com",
    title: "UX Researcher",
    company: "Microsoft",
    industry: "Technology",
    location: "Redmond, WA",
    visitedAt: "2024-03-04T07:15:00Z",
    jobType: "Full-time",
  },
  {
    id: 3,
    logo: "https://logo.clearbit.com/tesla.com",
    title: "Interface Engineer",
    company: "Tesla",
    industry: "Automotive",
    location: "Palo Alto, CA",
    visitedAt: "2024-03-03T18:45:00Z",
    jobType: "Full-time",
  },
  {
    id: 4,
    logo: "https://logo.clearbit.com/airbnb.com",
    title: "Product Designer",
    company: "Airbnb",
    industry: "Hospitality",
    location: "Remote",
    visitedAt: "2024-03-03T14:20:00Z",
    jobType: "Contract",
  },
  {
    id: 5,
    logo: "https://logo.clearbit.com/spotify.com",
    title: "Product Manager",
    company: "Spotify",
    industry: "Entertainment",
    location: "New York, NY",
    visitedAt: "2024-03-02T11:00:00Z",
    jobType: "Full-time",
  },
  {
    id: 6,
    logo: "https://logo.clearbit.com/notion.so",
    title: "Interaction Architect",
    company: "Notion",
    industry: "Technology",
    location: "Remote",
    visitedAt: "2024-03-01T15:30:00Z",
    jobType: "Remote",
  },
  {
    id: 7,
    logo: "https://logo.clearbit.com/stripe.com",
    title: "Fullstack Developer",
    company: "Stripe",
    industry: "Fintech",
    location: "San Francisco, CA",
    visitedAt: "2024-03-01T09:10:00Z",
    jobType: "Hybrid",
  },
  {
    id: 8,
    logo: "https://logo.clearbit.com/figma.com",
    title: "Frontend Developer",
    company: "Figma",
    industry: "Technology",
    location: "San Francisco, CA",
    visitedAt: "2024-02-28T16:45:00Z",
    jobType: "Full-time",
  },
];

const PAGE_SIZE = 6;

// ── Helpers ───────────────────────────────────────────────

function formatVisitedAt(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date("2024-03-04T08:58:00Z"); // Mocked current time
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 24) {
    if (diffInHours === 0) return "Just now";
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Component ─────────────────────────────────────────────

export default function JobVisitHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setHistory((prev) => prev.filter((h) => h.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const filtered = history.filter((h) => {
    return (
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.company.toLowerCase().includes(search.toLowerCase()) ||
      h.industry.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Stats
  const totalVisits = history.length;
  const uniqueCompanies = new Set(history.map((h) => h.company)).size;
  const topIndustry =
    history.length > 0
      ? Object.entries(
          history.reduce(
            (acc, curr) => {
              acc[curr.industry] = (acc[curr.industry] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>,
          ),
        ).sort((a, b) => b[1] - a[1])[0][0]
      : "None";

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Job View History
        </h1>
        <p className="text-sm text-[color:var(--paragraph)]">
          Manage and revisit your recently viewed job listings.
        </p>
      </div>

      {/* ── Stats Bar ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-green-50 flex items-center justify-center text-primary shrink-0">
            <History className="size-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-[color:var(--paragraph)] uppercase tracking-wider">
              Total Visits
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-2xl font-bold text-foreground">
                {totalVisits}
              </span>
              <span className="text-[10px] font-bold text-green-500 bg-green-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp className="size-2.5" />
                8%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
            <BriefcaseBusiness className="size-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-[color:var(--paragraph)] uppercase tracking-wider">
              Unique Companies
            </p>
            <p className="text-2xl font-bold text-foreground mt-0.5">
              {uniqueCompanies}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
            <MapPin className="size-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-[color:var(--paragraph)] uppercase tracking-wider">
              Top Industry
            </p>
            <p className="text-lg font-bold text-foreground truncate max-w-[150px] mt-0.5">
              {topIndustry}
            </p>
          </div>
        </div>
      </div>

      {/* ── Search & Filter ─────────────────────────────── */}
      <div className="flex items-center gap-4 bg-white p-2 border border-border rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-[color:var(--paragraph)]" />
          <input
            type="text"
            placeholder="Search by job title, company or industry..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full h-11 pl-10.5 pr-4 rounded-lg bg-transparent border-none text-sm text-foreground focus:outline-none placeholder:text-slate-400"
          />
        </div>
        <button
          onClick={() => setHistory([])}
          className="px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
        >
          Clear History
        </button>
      </div>

      {/* ── History List ────────────────────────────────── */}
      <div className="space-y-4">
        {paginated.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border border-dashed py-20 flex flex-col items-center text-center px-6">
            <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
              <History className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              No visit history found
            </h3>
            <p className="text-sm text-[color:var(--paragraph)] mt-1.5 max-w-xs mx-auto">
              Your history is empty. Start exploring jobs on JobsMake to see
              your activity here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {paginated.map((item) => {
              const isRemoving = removingId === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border border-border shadow-sm p-4 hover:border-primary/50 transition-all duration-300 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden group ${
                    isRemoving
                      ? "opacity-0 scale-95 -translate-y-4"
                      : "opacity-100"
                  }`}
                >
                  {/* Left: Logo & Job Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="size-14 rounded-2xl border border-border p-2 bg-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={item.logo}
                        alt={item.company}
                        className="size-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              item.company,
                            )}&background=random&size=56`;
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[10px] font-bold bg-slate-100 text-[color:var(--paragraph)] px-1.5 py-0.5 rounded-md">
                          {item.jobType}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[color:var(--paragraph)]">
                        <span className="flex items-center gap-1">
                          <Building className="size-3.5" />
                          {item.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="size-3.5" />
                          {item.industry}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Timestamp & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <Clock className="size-3.5 text-primary" />
                        {formatVisitedAt(item.visitedAt)}
                      </span>
                      <span className="text-[10px] text-[color:var(--paragraph)]">
                        Last visit
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="size-9 rounded-xl border border-border text-[color:var(--paragraph)] hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center"
                        title="Remove from history"
                      >
                        <Trash2 className="size-4" />
                      </button>
                      <button className="h-9 px-4 rounded-xl bg-foreground text-white text-xs font-bold hover:bg-foreground/90 transition-all flex items-center gap-2">
                        Visit Again
                        <ExternalLink className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Pagination ──────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <p className="text-sm text-[color:var(--paragraph)]">
            Showing{" "}
            <span className="font-bold text-foreground">
              {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}
            </span>{" "}
            to{" "}
            <span className="font-bold text-foreground">
              {Math.min(page * PAGE_SIZE, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-foreground">
              {filtered.length} total visits
            </span>
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="size-10 rounded-xl border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft className="size-4.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`size-10 rounded-xl text-sm font-bold transition-all border ${
                  page === n
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-white border-border text-[color:var(--paragraph)] hover:border-primary hover:text-primary"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="size-10 rounded-xl border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight className="size-4.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
