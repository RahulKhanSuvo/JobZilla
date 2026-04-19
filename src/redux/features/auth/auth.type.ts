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
  phone: string | null;
  location: string | null;
  dob: string | null;
  gender: string | null;
  maritalStatus: string | null;
  language: string | null;
  aboutMe: string | null;
  avatar: string | null;
  facebook: string | null;
  linkedin: string | null;
  github: string | null;
  twitter: string | null;
  skills: Skill[];
  eductions: Education[];
  workExperiences: WorkExperience[];
}

export type CandidateProfileData = {
  fullName: string;
  email: string;
  candidate?: CandidateProfile | null;
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

export type CurrentUserResponse = {
  success: boolean;
  message: string;
  data: AuthUser;
};
