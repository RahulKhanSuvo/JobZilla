import DashboardTitle from "@/components/common/DashboardTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Briefcase,
  Users,
  Clock,
  Edit2,
  Lock,
} from "lucide-react";
import CommonWrapper from "@/components/common/CommonWrapper";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useGetMyJobsQuery } from "@/redux/features/job/job.api";
import { Skeleton } from "@/components/ui/skeleton";
import type { IJob } from "@/types/job";

const stats = [
  {
    label: "Job Published",
    value: "0",
    icon: Briefcase,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Total Applicants",
    value: "0",
    icon: Users,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Pending Review",
    value: "0",
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
  },
];

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
};

export default function MyJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: jobResponse, isLoading } = useGetMyJobsQuery({
    searchTerm: debouncedSearch,
    sortBy,
    sortOrder,
    page: 1,
    limit: 10,
  });

  const jobs = jobResponse?.data?.data || [];
  const meta = jobResponse?.data?.meta;

  const handleSortChange = (value: string) => {
    if (value === "newest") {
      setSortBy("createdAt");
      setSortOrder("desc");
    } else if (value === "oldest") {
      setSortBy("createdAt");
      setSortOrder("asc");
    } else {
      setSortBy("createdAt");
      setSortOrder("desc");
    }
  };

  // Update stats based on real data
  const updatedStats = [
    {
      ...stats[0],
      value: meta?.total?.toString() || "0",
    },
    ...stats.slice(1),
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashboardTitle>My Jobs</DashboardTitle>
        <Link to={"post-job"}>
          <Button className="bg-primary text-white font-bold px-8 gap-2 h-12">
            <Plus className="size-5" />
            Post Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {updatedStats.map((stat, index) => (
          <CommonWrapper
            key={index}
            className="px-6 py-6 flex items-center gap-5"
          >
            <div
              className={`size-14 rounded-2xl flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="size-7" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 font-medium mt-1">
                {stat.label}
              </p>
            </div>
          </CommonWrapper>
        ))}
      </div>

      {/* Search and Sort */}
      <CommonWrapper className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-slate-50/50 border-none rounded-xl"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
            Sort by:
          </span>
          <Select defaultValue="newest" onValueChange={handleSortChange}>
            <SelectTrigger className="h-12 border-none bg-slate-50/50 rounded-xl px-4 min-w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CommonWrapper>

      {/* Job Table */}
      <CommonWrapper className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  My Jobs
                </th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Applicants
                </th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Created & Expiry
                </th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-8 py-4">
                      <Skeleton className="h-20 w-full rounded-xl" />
                    </td>
                  </tr>
                ))
              ) : jobs.length > 0 ? (
                jobs.map((job: IJob) => (
                  <tr
                    key={job.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-2">
                        <h4 className="text-[17px] font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors cursor-pointer capitalize">
                          {job.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 mt-1.5">
                        <Briefcase className="size-4" />
                        <span className="text-sm font-medium">
                          {job.jobType?.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm text-slate-600 font-semibold">
                        0 Applicants
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="text-sm text-slate-600 font-medium">
                          Created:{" "}
                          <span className="text-slate-900">
                            {formatDate(job.createdAt)}
                          </span>
                        </p>
                        <p className="text-sm text-slate-600 font-medium">
                          Expiry date:{" "}
                          <span className="text-slate-900">
                            {job.deadline ? formatDate(job.deadline) : "N/A"}
                          </span>
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
                        Published
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                          <Lock className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          className="h-10 px-6 border-emerald-500 text-emerald-600 font-bold hover:bg-emerald-50 rounded-lg"
                        >
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center">
                    <p className="text-slate-500 font-medium">No jobs found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CommonWrapper>
    </div>
  );
}
