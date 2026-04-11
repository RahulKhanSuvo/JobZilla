import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import SavedJobTable from "./components/SavedJobTable";
import { type Job } from "./components/SavedJobRow";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const DUMMY_JOBS: Job[] = [
  {
    id: "1",
    title: "UI UX Designer",
    company: "Diamond Trading Estates",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=DT&backgroundColor=00d084",
    postedAt: "2 days ago",
    category: "Part-time",
    datePosted: "December 18, 2023",
  },
  {
    id: "2",
    title: "Human Resource",
    company: "Sun West Condominiums",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SW&backgroundColor=0693e3",
    postedAt: "2 days ago",
    category: "Full-time",
    datePosted: "December 18, 2023",
  },
  {
    id: "3",
    title: "Python Developer",
    company: "Eclipse Estates",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=EE&backgroundColor=eb144c",
    postedAt: "2 days ago",
    category: "Contract",
    datePosted: "December 18, 2023",
  },
  {
    id: "4",
    title: "PHP Developer",
    company: "Southeastern Properties",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SP&backgroundColor=ff6900",
    postedAt: "2 days ago",
    category: "On site",
    datePosted: "December 18, 2023",
  },
];

export default function SaveJob() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Default");

  const handleView = (id: string) => {
    console.log("Viewing job:", id);
  };

  const handleRemove = (id: string) => {
    console.log("Removing job:", id);
  };

  const filteredJobs = DUMMY_JOBS.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-green-500 rounded-full" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Save Jobs
        </h1>
      </div>

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-10 bg-gray-50 dark:bg-slate-800 border-none h-11 focus-visible:ring-1 focus-visible:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-11 px-4 bg-gray-50 dark:bg-slate-800 border-none font-normal text-gray-600 dark:text-gray-300 gap-2"
            >
              <span>Sort by ({sortBy})</span>
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setSortBy("Default")}>
              Default
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Newest")}>
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Oldest")}>
              Oldest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Jobs Table */}
      <SavedJobTable
        jobs={filteredJobs}
        onView={handleView}
        onRemove={handleRemove}
      />

      {/* Footer / Pagination Placeholder */}
      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        ©2026 Jobtex. All Rights Reserved.
      </div>
    </div>
  );
}
