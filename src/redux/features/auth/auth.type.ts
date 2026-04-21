import type { ProfileFormData } from "@/pages/Candidate/Profile/profileSchema";
import type { RecruiterProfileFormData } from "@/pages/Recruiter/Profile/recruiterProfileSchema";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "CANDIDATE" | "EMPLOYER" | "ADMIN";
  phone?: string;
  resumeUrl: string | null;
  createdAt: string;
  updatedAt: string;
  candidate?: ProfileFormData | null;
  company?: RecruiterProfileFormData | null;
}

export interface LoginSuccessResponse {
  success: true;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface LoginErrorResponse {
  success: false;
  message: string;
}
export interface Skill {
  id: string;
  skill: string;
  candideId: string;
}

export interface CandidateProfile {
  id: string;
  userId: string;
  phone: string;
  location: string;
  dob: string;
  gender: string;
  preferredJobType: "FULL_TIME" | "PART_TIME" | "REMOTE" | "HYBRID";
  preferredCareerLevel:
    | "ENTRY_LEVEL"
    | "MID_LEVEL"
    | "SENIOR_LEVEL"
    | "EXECUTIVE_LEVEL";
  preferredCategory:
    | "TECHNOLOGY"
    | "DESIGN"
    | "MARKETING"
    | "SALES"
    | "FINANCE"
    | "HR"
    | "OPERATIONS"
    | "CUSTOMER_SUPPORT"
    | "EDUCATION"
    | "HEALTHCARE"
    | "LEGAL"
    | "OTHER";
  maritalStatus: string;
  languages: languages[] | null;
  aboutMe: string;
  avatar: string;
  facebook: string;
  linkedin: string;
  github: string;
  twitter: string;
}
type languages = {
  language: string;
};

export type AuthUser = {
  id: string;
  name?: string;
  email: string;
  role: "CANDIDATE" | "RECRUITER" | "ADMIN";
  phone?: string;
  resumeUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  candidate?: CandidateProfile | null;
  company?: RecruiterProfileFormData | null;
  skills?: Skill[] | null;
  languages?: languages[] | null;
  eductions?: Education[] | null;
  workExperiences?: WorkExperience[] | null;
};

export interface Education {
  id: string;
  institution: string;
  major: string;
  field: string;
  startData: string | null;
  endData: string | null;
  isStudying: boolean;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  industry: string;
  startData: string | null;
  endData: string | null;
  isWorking: boolean;
  Description: string | null;
}
