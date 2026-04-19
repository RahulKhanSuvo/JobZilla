import { ReusableTable } from "@/components/common/ReusableTable";
import DashboardTitle from "@/components/common/DashboardTitle";
import CommonWrapper from "@/components/common/CommonWrapper";
import {
  followedCompanyColumns,
} from "./followedCompanyColumns";
import { useGetAllFollwedCompanyQuery } from "@/redux/features/candidate/follow.api";

export default function FollowCompany() {
  const { data: response, isLoading } = useGetAllFollwedCompanyQuery(undefined);
  console.log(response?.data);
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <DashboardTitle>Followed Companies</DashboardTitle>
        <p className="text-sm text-muted-foreground mt-1 ml-4">
          Stay updated with your favorite employers
        </p>
      </div>

      <CommonWrapper className="overflow-hidden">
        <ReusableTable
          columns={followedCompanyColumns}
          data={response?.data || []}
          isLoading={isLoading}
          emptyMessage="You are not following any companies yet."
          className="border-none"
        />
      </CommonWrapper>
    </div>
  );
}
