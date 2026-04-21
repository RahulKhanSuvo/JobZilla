import { ReusableTable } from "@/components/common/ReusableTable";
import DashboardTitle from "@/components/common/DashboardTitle";
import CommonWrapper from "@/components/common/CommonWrapper";
import { followedCompanyColumns } from "./followedCompanyColumns";
import {
  useGetAllFollwedCompanyQuery,
  useUnFollowACompanyMutation,
} from "@/redux/features/candidate/follow.api";
import { errorToast } from "@/utils/errorToast";
import { toast } from "sonner";

export default function FollowCompany() {
  const { data: response, isLoading } = useGetAllFollwedCompanyQuery(undefined);
  const [unFollowACompany] = useUnFollowACompanyMutation();

  const handleUnfollow = async (companyId: string) => {
    try {
      await unFollowACompany({ companyId }).unwrap();
      toast.success("Company unfollowed successfully");
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <DashboardTitle>Followed Companies</DashboardTitle>
        <p className="text-sm text-muted-foreground mt-1 ml-4">
          Stay updated with your favorite employers
        </p>
      </div>

      <CommonWrapper className="overflow-hidden bg-white dark:bg-slate-900">
        <ReusableTable
          columns={followedCompanyColumns(handleUnfollow)}
          data={response?.data || []}
          isLoading={isLoading}
          emptyMessage="You are not following any companies yet."
          className="border-none"
        />
      </CommonWrapper>
    </div>
  );
}
