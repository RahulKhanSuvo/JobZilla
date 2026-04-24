import { lazy, Suspense } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router";
import JobzillaLoading from "@/components/common/JobzillaLoading";

const Login = lazy(() => import("@/pages/auth/Login"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));

export const authRoutes: RouteObject = {
  path: "/auth",
  element: (
    <Suspense fallback={<JobzillaLoading />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    { index: true, element: <Navigate to={"login"} replace /> },
    { path: "login", element: <Login /> },
    { path: "sign-up", element: <SignUp /> },
    { path: "forgot-password", element: <ForgotPassword /> },
    { path: "reset-password/:token", element: <ResetPassword /> },
  ],
};
