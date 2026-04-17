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

export interface WorkExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  industry: string;
  startData: string;
  endData: string | null;
  Description: string;
  isWorking: boolean;
}

export interface Skill {
  id: string;
  skill: string;
}

export interface Education {
  id: string;
  institution: string;
  major: string;
  field: string;
  startData: string;
  endData: string | null;
  isStudying: boolean;
}

export interface ApplicationCandidate {
  location: string | null;
  profileImage: string | null;
  aboutMe?: string | null;
  language?: string | null;
  skills?: Skill[];
  eductions?: Education[];
  workExperiences?: WorkExperience[];
}

export interface ApplicationUser {
  name: string;
  email?: string;
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
