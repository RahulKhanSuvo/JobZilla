import DashboardTitle from "@/components/common/DashboardTitle";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Lock, Unlock, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import MyJobsStats from "./components/MyJobsStats";
import MyJobsControls from "./components/MyJobsControls";
import MyJobsTable from "./components/MyJobsTable";
import { useState, useEffect } from "react";
import {
  useDeleteJobMutation,
  useGetJobStatsQuery,
  useGetMyJobsQuery,
  useUpdateJobStatusMutation,
} from "@/redux/features/job/job.api";
import { toast } from "sonner";
import { errorToast } from "@/utils/errorToast";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useProfileGuard } from "@/hooks/useProfileGuard";
import CompleteProfileModal from "@/components/recruiter/CompleteProfileModal";
import { motion } from "motion/react";
export default function MyJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();
  const [updateJobStatus, { isLoading: isUpdatingStatus }] =
    useUpdateJobStatusMutation();
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const { data: jobStats, isLoading: isJobStatsLoading } =
    useGetJobStatsQuery();

  const { checkProfile, isModalOpen, setIsModalOpen } = useProfileGuard();
  const navigate = useNavigate();

  console.log("jobstats", jobStats);
  const stats = [
    {
      label: "Job Published",
      value: jobStats?.data.totalJobs?.toString() || "0",
      icon: Briefcase,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Applicants",
      value: jobStats?.data.totalApplicants?.toString() || "0",
      icon: Users,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Open Jobs",
      value: jobStats?.data.openJobs?.toString() || "0",
      icon: Unlock,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Closed Jobs",
      value: jobStats?.data.closedJobs?.toString() || "0",
      icon: Lock,
      color: "bg-amber-50 text-amber-600",
    },
  ];
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

  const jobs = jobResponse?.data || [];
  const meta = jobResponse?.meta;

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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const result = await updateJobStatus({ id, status });
      if (result.data) {
        toast.success("Job status updated successfully");
      }
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashboardTitle>My Jobs</DashboardTitle>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            onClick={() => checkProfile(() => navigate("post-job"))}
            className="bg-primary text-white font-bold px-8 gap-2 h-12"
          >
            <Plus className="size-5" />
            Post Job
          </Button>
        </motion.div>
      </div>

      <CompleteProfileModal isOpen={isModalOpen} onClose={setIsModalOpen} />

      {/* Stats Cards */}
      <MyJobsStats stats={updatedStats} isLoading={isJobStatsLoading} />

      {/* Search and Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <MyJobsControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSortChange={handleSortChange}
        />
        {/* Job Table */}
        <MyJobsTable
          jobs={jobs}
          isLoading={isLoading}
          isUpdatingStatus={isUpdatingStatus}
          handleStatusChange={handleStatusChange}
          setSelectedJobId={setSelectedJobId}
          setOpen={setOpen}
        />
        <ConfirmDialog
          open={open}
          title="Delete Job?"
          description="This job will be permanently deleted."
          loading={isDeleting}
          onCancel={() => {
            setOpen(false);
            setSelectedJobId(null);
          }}
          onConfirm={async () => {
            if (!selectedJobId) return;

            try {
              await deleteJob(selectedJobId).unwrap();
              toast.success("Job deleted successfully");
            } catch (error) {
              errorToast(error);
            } finally {
              setOpen(false);
              setSelectedJobId(null);
            }
          }}
        />{" "}
      </motion.div>
    </div>
  );
}
