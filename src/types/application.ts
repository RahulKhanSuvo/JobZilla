export type ApplicationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "SHORTLISTED";

export interface ApplicationCompanyUser {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationCompany {
  id: string;
  userId: string;
  description: string;
  website: string;
  industry: string;
  phone: string;
  location: string;
  companySize: string;
  logo: string | null;
  foundedDate: string;
  coverImage: string | null;
  facebook: string;
  linkedin: string;
  twitter: string;
  address: string;
  showProfile: boolean;
  createdAt: string;
  updatedAt: string;
  user: ApplicationCompanyUser;
}

export interface ApplicationJob {
  title: string;
  company: ApplicationCompany;
}

export interface ApplicationCandidate {
  location: string;
  profileImage: string | null;
}

export interface ApplicationUser {
  name: string;
  candidate: ApplicationCandidate;
}

export interface ApplicationResume {
  title: string;
  fileUrl: string;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  resumeId: string;
  companyId: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  job: ApplicationJob;
  user: ApplicationUser;
  resume: ApplicationResume;
}
