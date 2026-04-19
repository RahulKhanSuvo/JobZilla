export type CandidateDashboardStats = {
  totalApplications: number;
  totalSavedJobs: number;
  totalViews: number;
  totlaShortListedJobs: number;
};

export type EmployerStats = {
  totalJobs: number;
  openJobs: number;
  closedJobs: number;
  totalViews: number;
  totalApplicants: number;
  pendingApplicants: number;
  shortlistedApplicants: number;
  hiredApplicants: number;
  rejectedApplicants: number;
  applicationTrend: { day: string; value: number }[];
  recentApplicants: RecentApplicant[];
};

export type RecentApplicant = {
  id: string;
  userId: string;
  jobId: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    candidate?: {
      avatar: string | null;
    };
  };
  job: {
    title: string;
  };
};
