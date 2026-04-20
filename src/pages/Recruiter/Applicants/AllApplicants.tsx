import DashboardTitle from "@/components/common/DashboardTitle";
import { useNavigate } from "react-router";
import { useStartConversationMutation } from "@/redux/features/chat/chat.api";
import {
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/redux/features/recruiter/application.api";
import type { Application, ApplicationStatus } from "@/types/application";
import { errorToast } from "@/utils/errorToast";
import { toast } from "sonner";
import { useState } from "react";

// Modular Components
import ApplicantsStats from "./components/ApplicantsStats";
import ApplicantsFilters from "./components/ApplicantsFilters";
import ApplicantsTable from "./components/ApplicantsTable";
import ApplicantsPagination from "./components/ApplicantsPagination";

// ─── Constants ───────────────────────────────────────────────────
const PAGE_SIZE = 10;

export default function AllApplicants() {
  // ─── Filter & Sort State ──────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [jobFilter, setJobFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  // ─────────────────────────────────────────────────────────────

  const { data: response, isLoading } = useGetAllApplicationsQuery({
    searchTerm: searchQuery,
    status: statusFilter,
    jobFilter: jobFilter,
    sortBy: sortBy,
    page: currentPage,
    limit: PAGE_SIZE,
  });

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();
  const [startConversation] = useStartConversationMutation();
  const navigate = useNavigate();

  const applicationList: Application[] = response?.data ?? [];
  const meta = response?.meta;

  // ─── Stats ───────────────────────────────────────────────────
  const statsData = meta?.stats || {
    ALL: 0,
    PENDING: 0,
    SHORTLISTED: 0,
    HIRED: 0,
    REJECTED: 0,
  };

  const totalItems = meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  // Reset to page 1 whenever filters change
  const handleFilterChange = (fn: () => void) => {
    fn();
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" || statusFilter !== "ALL" || jobFilter !== "ALL";

  const clearAllFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    setJobFilter("ALL");
    setSortBy("newest");
    setCurrentPage(1);
  };

  // ─── Actions ──────────────────────────────────────────────────
  const handleOpenChat = async (targetUserId: string) => {
    try {
      const res = await startConversation({ targetUserId }).unwrap();
      navigate(`/recruiter/messages/${res.data.id}`);
    } catch (error) {
      errorToast(error);
    }
  };

  const handleUpdateStatus = async (
    applicationId: string,
    status: ApplicationStatus,
  ) => {
    try {
      setLoadingId(applicationId);
      await updateApplicationStatus({ applicationId, status }).unwrap();
      toast.success(`Applicant marked as ${status.toLowerCase()}`);
    } catch (error) {
      errorToast(error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <DashboardTitle>All Applicants</DashboardTitle>

      {/* Stats Cards */}
      <ApplicantsStats statsData={statsData} />

      {/* Filters Bar */}
      <ApplicantsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        jobFilter={jobFilter}
        setJobFilter={setJobFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        uniqueJobs={meta?.uniqueJobs || []}
        statsData={statsData}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearAllFilters}
        onFilterChange={handleFilterChange}
      />

      {/* Applicants Table & Count */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-slate-500 font-medium">
            Project Applicants
          </p>
          {hasActiveFilters && (
            <p className="text-xs text-primary font-semibold bg-primary/5 px-3 py-1 rounded-full">
              Filters active
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <ApplicantsTable
            isLoading={isLoading}
            applicationList={applicationList}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearAllFilters}
            loadingId={loadingId}
            onUpdateStatus={handleUpdateStatus}
            onOpenChat={handleOpenChat}
          />

          {!isLoading && totalItems > 0 && (
            <ApplicantsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={PAGE_SIZE}
              totalItems={totalItems}
            />
          )}
        </div>
      </div>
    </div>
  );
}
