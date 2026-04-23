/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, FilterX } from "lucide-react";
import CommonWrapper from "@/components/common/CommonWrapper";

const STATUS_TABS: { label: string; value: string }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Shortlisted", value: "SHORTLISTED" },
  { label: "Hired", value: "HIRED" },
  { label: "Rejected", value: "REJECTED" },
];

interface ApplicantsFiltersProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  jobFilter: string;
  setJobFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  uniqueJobs: string[];
  statsData: {
    ALL: number;
    PENDING: number;
    SHORTLISTED: number;
    HIRED: number;
    REJECTED: number;
  };
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onFilterChange: (fn: () => void) => void;
}

export default function ApplicantsFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  jobFilter,
  setJobFilter,
  sortBy,
  setSortBy,
  uniqueJobs,
  statsData,
  hasActiveFilters,
  onClearFilters,
  onFilterChange,
}: ApplicantsFiltersProps) {
  return (
    <CommonWrapper className="p-5 space-y-4">
      {/* Row 1: Search + Job Filter + Sort */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Search by candidate name or job title..."
            value={searchQuery}
            onChange={(e) =>
              onFilterChange(() => setSearchQuery(e.target.value))
            }
            className="pl-11 h-11 bg-slate-50/80 border-slate-200 rounded-lg text-sm"
          />
        </div>

        {/* Filter by Job */}
        <Select
          value={jobFilter}
          onValueChange={(v) => onFilterChange(() => setJobFilter(v))}
        >
          <SelectTrigger className="h-11 border-slate-200 bg-slate-50/80 rounded-lg min-w-[180px] text-sm">
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-slate-400" />
              <SelectValue placeholder="Filter by Job" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Jobs</SelectItem>
            {uniqueJobs.map((job) => {
              const title = typeof job === "string" ? job : (job as any).title;
              return (
                <SelectItem key={title} value={title}>
                  {title}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={sortBy}
          onValueChange={(v) => onFilterChange(() => setSortBy(v))}
        >
          <SelectTrigger className="h-11 border-slate-200 bg-slate-50/80 rounded-lg min-w-[160px] text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name">Name A–Z</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="h-11 px-4 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
          >
            <FilterX className="size-4 mr-1.5" />
            Clear
          </Button>
        )}
      </div>

      {/* Row 2: Status Tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {STATUS_TABS.map((tab) => {
          const count = statsData[tab.value as keyof typeof statsData] || 0;

          return (
            <Button
              key={tab.value}
              onClick={() => onFilterChange(() => setStatusFilter(tab.value))}
              className={`h-8 px-3.5 rounded text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                statusFilter === tab.value
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {tab.label}
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  statusFilter === tab.value
                    ? "bg-white/20 text-white"
                    : "bg-white text-slate-500"
                }`}
              >
                {count}
              </span>
            </Button>
          );
        })}
      </div>
    </CommonWrapper>
  );
}
