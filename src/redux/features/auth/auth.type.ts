export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  resumeUrl: string | null;
  createdAt: string;
  updatedAt: string;
  candidate?: unknown;
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
export type AuthUser = {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  phone?: string;
  resumeUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  candidate?: unknown;
  company?: unknown;
};

export interface Education {
  id: string;
  institution: string;
  major: string;
  field: string;
  gap: number | null;
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
  description: string | null;
}

export type CurrentUserResponse = {
  success: boolean;
  message: string;
  data: AuthUser;
};
