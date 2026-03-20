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
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN";
  phone: string;
  resumeUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CurrentUserResponse = {
  success: boolean;
  message: string;
  data: AuthUser;
};
