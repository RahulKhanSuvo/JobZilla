import { ReusableTable } from "@/components/common/ReusableTable";
import DashboardTitle from "@/components/common/DashboardTitle";
import CommonWrapper from "@/components/common/CommonWrapper";
import {
  followedCompanyColumns,
  type FollowedCompany,
} from "./followedCompanyColumns";

// Dummy data for now
const dummyCompanies: FollowedCompany[] = [
  {
    id: "1",
    name: "Stripe",
    logo: "https://logo.clearbit.com/stripe.com",
    location: "San Francisco, CA",
    industry: "Financial Services",
    openJobs: 12,
  },
  {
    id: "2",
    name: "Vercel",
    logo: "https://logo.clearbit.com/vercel.com",
    location: "Remote",
    industry: "Software Development",
    openJobs: 5,
  },
  {
    id: "3",
    name: "Linear",
    logo: "https://logo.clearbit.com/linear.app",
    location: "San Francisco, CA",
    industry: "Productivity",
    openJobs: 3,
  },
];

export default function FollowCompany() {
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <DashboardTitle>Followed Companies</DashboardTitle>
        <p className="text-sm text-muted-foreground mt-1 ml-4">
          Stay updated with your favorite employers
        </p>
      </div>

      <CommonWrapper className="overflow-hidden">
        <ReusableTable<FollowedCompany>
          columns={followedCompanyColumns}
          data={dummyCompanies}
          isLoading={false}
          emptyMessage="You are not following any companies yet."
          className="border-none"
        />
      </CommonWrapper>
    </div>
  );
}
