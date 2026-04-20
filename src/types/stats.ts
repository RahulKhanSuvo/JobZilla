import type { Application } from "./application";

export interface IApplicationTrend {
  day: string;
  value: number;
}

export interface ITopJobStats {
  title: string;
  applicants: number;
}

export interface IRecruiterDashboardStats {
  totalJobs: number;
  openJobs: number;
  closedJobs: number;
  totalViews: number;
  totalApplicants: number;
  pendingApplicants: number;
  shortlistedApplicants: number;
  hiredApplicants: number;
  rejectedApplicants: number;
  applicationTrend: IApplicationTrend[];
  topJobs: ITopJobStats[];
  recentApplicants: Application[];
}
