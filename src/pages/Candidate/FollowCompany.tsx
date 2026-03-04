import { useState } from "react";
import {
  Building2,
  Search,
  MapPin,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Building,
  ArrowUpRight,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────

interface FollowedCompany {
  id: number;
  logo: string;
  name: string;
  industry: string;
  location: string;
  activeJobs: number;
  followedOn: string;
}

// ── Mock Data ─────────────────────────────────────────────

const mockCompanies: FollowedCompany[] = [
  {
    id: 1,
    logo: "https://logo.clearbit.com/google.com",
    name: "Google",
    industry: "Technology",
    location: "Mountain View, CA",
    activeJobs: 124,
    followedOn: "15 Jan, 2024",
  },
  {
    id: 2,
    logo: "https://logo.clearbit.com/microsoft.com",
    name: "Microsoft",
    industry: "Technology",
    location: "Redmond, WA",
    activeJobs: 86,
    followedOn: "02 Feb, 2024",
  },
  {
    id: 3,
    logo: "https://logo.clearbit.com/tesla.com",
    name: "Tesla",
    industry: "Automotive",
    location: "Palo Alto, CA",
    activeJobs: 42,
    followedOn: "10 Feb, 2024",
  },
  {
    id: 4,
    logo: "https://logo.clearbit.com/netflix.com",
    name: "Netflix",
    industry: "Entertainment",
    location: "Los Gatos, CA",
    activeJobs: 18,
    followedOn: "20 Feb, 2024",
  },
  {
    id: 5,
    logo: "https://logo.clearbit.com/amazon.com",
    name: "Amazon",
    industry: "E-commerce",
    location: "Seattle, WA",
    activeJobs: 215,
    followedOn: "01 Mar, 2024",
  },
  {
    id: 6,
    logo: "https://logo.clearbit.com/spotify.com",
    name: "Spotify",
    industry: "Music Streaming",
    location: "Stockholm, SE",
    activeJobs: 33,
    followedOn: "02 Mar, 2024",
  },
  {
    id: 7,
    logo: "https://logo.clearbit.com/notion.so",
    name: "Notion",
    industry: "Technology",
    location: "San Francisco, CA",
    activeJobs: 12,
    followedOn: "03 Mar, 2024",
  },
  {
    id: 8,
    logo: "https://logo.clearbit.com/stripe.com",
    name: "Stripe",
    industry: "Fintech",
    location: "San Francisco, CA",
    activeJobs: 54,
    followedOn: "03 Mar, 2024",
  },
];

const INDUSTRIES = [
  "All Industries",
  "Technology",
  "Automotive",
  "Entertainment",
  "E-commerce",
  "Music Streaming",
  "Fintech",
];

const PAGE_SIZE = 6;

// ── Component ─────────────────────────────────────────────

export default function FollowCompany() {
  const [companies, setCompanies] = useState<FollowedCompany[]>(mockCompanies);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [page, setPage] = useState(1);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleUnfollow = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
      setRemovingId(null);
      // Adjust page if necessary
      const newTotal = companies.length - 1;
      const maxPage = Math.max(1, Math.ceil(newTotal / PAGE_SIZE));
      if (page > maxPage) setPage(maxPage);
    }, 300);
  };

  const filtered = companies.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase());
    const matchIndustry =
      industryFilter === "All Industries" || c.industry === industryFilter;
    return matchSearch && matchIndustry;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-10">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Followed Companies
          </h1>
          <p className="text-sm text-[color:var(--paragraph)] mt-0.5">
            You are following{" "}
            <span className="font-semibold text-foreground">
              {companies.length}
            </span>{" "}
            companies
          </p>
        </div>
      </div>

      {/* ── Stats Bar ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-center gap-4">
          <div className="size-10 rounded-lg bg-green-50 flex items-center justify-center text-primary shrink-0">
            <Building2 className="size-5" />
          </div>
          <div>
            <p className="text-xs text-[color:var(--paragraph)]">
              Total Following
            </p>
            <p className="text-xl font-bold text-foreground">
              {companies.length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-center gap-4">
          <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
            <Briefcase className="size-5" />
          </div>
          <div>
            <p className="text-xs text-[color:var(--paragraph)]">Active Jobs</p>
            <p className="text-xl font-bold text-foreground">
              {companies.reduce((acc, curr) => acc + curr.activeJobs, 0)}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-center gap-4">
          <div className="size-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
            <UserCheck className="size-5" />
          </div>
          <div>
            <p className="text-xs text-[color:var(--paragraph)]">
              Hiring Companies
            </p>
            <p className="text-xl font-bold text-foreground">
              {companies.filter((c) => c.activeJobs > 0).length}
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ──────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-4 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[color:var(--paragraph)] pointer-events-none" />
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Industry Filter */}
        <div className="relative">
          <select
            value={industryFilter}
            onChange={(e) => {
              setIndustryFilter(e.target.value);
              setPage(1);
            }}
            className="h-10 pl-4 pr-10 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer transition-all min-w-[160px]"
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[color:var(--paragraph)] pointer-events-none" />
        </div>
      </div>

      {/* ── Company Grid ────────────────────────────────── */}
      {paginated.length === 0 ? (
        <div className="bg-white rounded-xl border border-border shadow-sm py-16 flex flex-col items-center text-center gap-3">
          <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
            <Building className="size-8" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-lg">
              No companies found
            </p>
            <p className="text-sm text-[color:var(--paragraph)] mt-1 max-w-xs mx-auto">
              We couldn't find any companies matching your search or filters.
            </p>
          </div>
          <button
            onClick={() => {
              setSearch("");
              setIndustryFilter("All Industries");
            }}
            className="text-primary text-sm font-semibold hover:underline mt-2"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((company) => {
            const isRemoving = removingId === company.id;
            return (
              <div
                key={company.id}
                className={`bg-white rounded-xl border border-border shadow-sm p-6 group transition-all duration-300 relative overflow-hidden ${
                  isRemoving
                    ? "opacity-0 scale-95 translate-y-4"
                    : "opacity-100"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="size-14 rounded-xl object-contain border border-border p-2 bg-white"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          company.name,
                        )}&background=random&size=56`;
                    }}
                  />
                  <button
                    onClick={() => handleUnfollow(company.id)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border text-[color:var(--paragraph)] hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center gap-1.5"
                  >
                    Unfollow
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    {company.name}
                    <ArrowUpRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-[color:var(--paragraph)] font-medium">
                    {company.industry}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4 text-xs text-[color:var(--paragraph)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {company.location}
                  </span>
                  <span className="size-1 rounded-full bg-slate-200" />
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    <Briefcase className="size-3.5" />
                    {company.activeJobs} Active Jobs
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-[color:var(--paragraph)] italic">
                    Following since {company.followedOn}
                  </span>
                  <button className="text-xs font-bold text-primary hover:underline">
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pagination ──────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-[color:var(--paragraph)]">
            Showing{" "}
            <span className="font-medium text-foreground">
              {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(page * PAGE_SIZE, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            companies
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="size-9 rounded-lg border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`size-9 rounded-lg text-sm font-bold transition-all border ${
                  page === n
                    ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                    : "bg-white border-border text-[color:var(--paragraph)] hover:border-primary hover:text-primary"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="size-9 rounded-lg border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
