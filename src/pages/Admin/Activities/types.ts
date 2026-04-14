export type ActivityModule = "User" | "Job" | "Company" | "Auth" | "System";
export type ActivitySeverity = "info" | "warning" | "error" | "critical";

export interface Activity {
  id: string;
  action: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  module: ActivityModule;
  severity: ActivitySeverity;
  timestamp: string;
  details?: string;
  isResolved?: boolean;
}

export const DUMMY_ACTIVITIES: Activity[] = [
  {
    id: "a1",
    action: "User Account Suspended",
    user: {
      name: "Admin Rahul",
      email: "admin@jobzilla.com",
    },
    module: "User",
    severity: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    details:
      "Account of user 'john.doe@example.com' was suspended due to policy violation.",
    isResolved: false,
  },
  {
    id: "a2",
    action: "New Job Approved",
    user: {
      name: "Admin Rahul",
      email: "admin@jobzilla.com",
    },
    module: "Job",
    severity: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    details:
      "Job 'Senior React Developer' from 'TechCorp' has been approved and is now live.",
  },
  {
    id: "a3",
    action: "Database Connection Failed",
    user: {
      name: "System",
      email: "system@jobzilla.com",
    },
    module: "System",
    severity: "critical",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    details:
      "Failed to connect to primary database cluster. Retrying connection...",
    isResolved: true,
  },
  {
    id: "a4",
    action: "Company Verified",
    user: {
      name: "Admin Rahul",
      email: "admin@jobzilla.com",
    },
    module: "Company",
    severity: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    details: "Company 'GrowthLabs' has been manually verified.",
  },
  {
    id: "a5",
    action: "Multiple Failed Login Attempts",
    user: {
      name: "Security Bot",
      email: "security@jobzilla.com",
    },
    module: "Auth",
    severity: "error",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    details:
      "IP address 192.168.1.100 attempted to login 10 times with invalid credentials.",
    isResolved: false,
  },
  {
    id: "a6",
    action: "Job Posting Deleted",
    user: {
      name: "Admin Rahul",
      email: "admin@jobzilla.com",
    },
    module: "Job",
    severity: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    details: "Deleted expired job posting 'Marketing Intern'.",
  },
];
