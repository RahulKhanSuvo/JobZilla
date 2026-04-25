/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Education {
  id: string;
  institution: string;
  major: string;
  field: string;
  startData: string;
  endData: string | null;
  isStudying: boolean;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  industry: string;
  startData: string;
  endData: string | null;
  isWorking: boolean;
  Description: string;
}

export interface Skill {
  id: string;
  skill: string;
}

export interface Language {
  id: string;
  language: string;
}

export interface CandidateProfile {
  id: string;
  userId: string;
  phone: string;
  aboutMe: string | null;
  dob: string | null;
  gender: string | null;
  maritalStatus: string | null;
  avatar: string | null;
  location: string | null;
  experienceYears: number | null;
  preferredCategory: string | null;
  preferredJobType: string | null;
  preferredCareerLevel: string | null;
  facebook: string | null;
  linkedin: string | null;
  github: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    languages: Language[];
    skills: Skill[];
    eductions: Education[];
    workExperiences: WorkExperience[];
  };
}

export interface CompanyProfile {
  id: string;
  userId: string;
  description: string | null;
  website: string;
  phone: string;
  location: string;
  logo: string | null;
  coverImage: string | null;
  companySize: string;
  industry: string | null;
  foundedDate: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    jobs: any[]; // You can refine this if needed
  };
}
