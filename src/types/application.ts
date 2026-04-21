export type ApplicationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "SHORTLISTED"
  | "HIRED";

export interface IApplicationMeta {
  total: number;
  skip: number;
  limit: number;
  stats: {
    ALL: number;
    PENDING: number;
    SHORTLISTED: number;
    HIRED: number;
    REJECTED: number;
  };
  uniqueJobs: string[];
}

export interface IApplicationResponse {
  success: boolean;
  message: string;
  data: Application[];
  meta: IApplicationMeta;
}

export interface ISingleApplicationResponse {
  success: boolean;
  message: string;
  data: Application;
}

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
  id?: string;
  title: string;
  category?: string;
  jobType?: string;
  experience?: string;
  careerLevel?: string;
  qualification?: string;
  deadline: string;
  salaryMin: number;
  salaryMax: number;
  salaryType?: string;

  user?: {
    name: string;
    company: {
      logo: string | null;
      location: string;
    };
  };
}

export interface ApplicationResume {
  id: string;
  title: string;
  fileUrl: string;
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
  avatar: string | null;
  aboutMe?: string | null;
}

export interface Language {
  id: string;
  language: string;
  userId: string;
}

export interface ApplicationUser {
  id: string;
  name: string;
  email?: string;
  candidate?: ApplicationCandidate;
  languages?: Language[];
  skills?: Skill[];
  eductions?: Education[];
  workExperiences?: WorkExperience[];
}

export interface Application {
  id: string;
  userId?: string;
  jobId?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt?: string;
  job: ApplicationJob;
  user?: ApplicationUser;
  resume?: ApplicationResume;
}
