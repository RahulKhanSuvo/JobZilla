import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import SavedJobTable from "./components/SavedJobTable";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  useGetSaveJobQuery,
  useUnSaveJobMutation,
} from "@/redux/features/job/job.api";
import { type Job } from "./components/SavedJobRow";
import { errorToast } from "@/utils/errorToast";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function SaveJob() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { data: saveJobs, isLoading } = useGetSaveJobQuery({
    sortBy,
    sortOrder,
    searchTerm: search,
  });
  const [unSaveJob] = useUnSaveJobMutation();
  const handleView = (id: string) => {
    navigate(`${id}`);
  };

  const handleRemove = async (id: string) => {
    try {
      await unSaveJob(id).unwrap();
      toast.success("Job unsaved successfully");
    } catch (error) {
      errorToast(error);
    }
  };

  const formattedJobs: Job[] = (saveJobs?.data || []).map((saved) => {
    const date = new Date(saved.job.createdAt);
    const jobTypeMap: Record<string, string> = {
      FULL_TIME: "Full-time",
      PART_TIME: "Part-time",
      CONTRACT: "Contract",
      INTERN: "Intern",
      FREELANCE: "Freelance",
      REMOTE: "Remote",
    };

    return {
      id: saved.jobId,
      title: saved.job.title,
      company: saved.job.user.name,
      logo: saved.job.user.company.logo || "",
      postedAt: "Recently",
      category: (jobTypeMap[saved.job.jobType as string] ||
        "Full-time") as Job["category"],
      datePosted: date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
  });

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
              <span>
                Sort by (
                {sortBy === "createdAt"
                  ? sortOrder === "desc"
                    ? "Newest"
                    : "Oldest"
                  : "Default"}
                )
              </span>
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => {
                setSortBy("createdAt");
                setSortOrder("desc");
              }}
            >
              Default
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSortBy("createdAt");
                setSortOrder("desc");
              }}
            >
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSortBy("createdAt");
                setSortOrder("asc");
              }}
            >
              Oldest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Jobs Table */}
      <SavedJobTable
        jobs={formattedJobs}
        onView={handleView}
        onRemove={handleRemove}
        isLoading={isLoading}
      />
    </div>
  );
}
