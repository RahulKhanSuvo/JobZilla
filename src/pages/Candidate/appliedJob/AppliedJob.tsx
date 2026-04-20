import type { Application } from "@/types/application";
import { ReusableTable } from "@/components/common/ReusableTable";
import DashboardTitle from "@/components/common/DashboardTitle";
import CommonWrapper from "@/components/common/CommonWrapper";
import { useGetCandidateAppliedJobsQuery } from "@/redux/features/candidate/candidate.api";
import { appliedJobColumns } from "./appliedJobColumns";

function AppliedJob() {
  const { data: response, isLoading } = useGetCandidateAppliedJobsQuery();

  const applications = response?.data || [];

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <DashboardTitle>Applied Jobs</DashboardTitle>
        <p className="text-sm text-muted-foreground mt-1 ml-4">
          Track and manage your recent job applications
        </p>
      </div>

      <CommonWrapper className="overflow-hidden bg-white dark:bg-slate-900">
        <ReusableTable<Application>
          columns={appliedJobColumns}
          data={applications}
          isLoading={isLoading}
          emptyMessage="You haven't applied to any jobs yet."
          className="border-none"
        />
      </CommonWrapper>
    </div>
  );
}

export default AppliedJob;
